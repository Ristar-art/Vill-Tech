// src/routes/api/contact/+server.js
import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const EMAIL_USER = env.EMAIL_USER;
const EMAIL_PASS = env.EMAIL_PASS;
const OWNER_EMAIL = env.OWNER_EMAIL;
const EMAIL_HOST = env.EMAIL_HOST;
const EMAIL_PORT = parseInt(env.EMAIL_PORT || '465');
const EMAIL_SECURE = env.EMAIL_SECURE === 'true';

// Validate required environment variables
if (!EMAIL_USER || !EMAIL_PASS) {
  console.error('Missing required environment variables: EMAIL_USER and/or EMAIL_PASS');
  throw new Error('Email configuration is incomplete. Please set EMAIL_USER and EMAIL_PASS in your .env file.');
}

// Rate limiting storage
const submissions = new Map();

setInterval(() => {
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    for (const [ip, timestamps] of submissions.entries()) {
        const recentSubmissions = timestamps.filter(time => time > oneHourAgo);
        if (recentSubmissions.length === 0) {
            submissions.delete(ip);
        } else {
            submissions.set(ip, recentSubmissions);
        }
    }
}, 60 * 60 * 1000);

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_SECURE, 
  auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
  },
  logger: true, 
  debug: true, 
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Email configuration error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Updated validation for booking form fields
function validateInput(organization, contact, email, phone, bookingType, startDate, message) {
  const errors = [];
  
  // Organization validation
  if (!organization || typeof organization !== 'string' || organization.trim().length < 2) {
    errors.push('Organization name must be at least 2 characters long');
  } else if (organization.trim().length > 100) {
    errors.push('Organization name must be less than 100 characters');
  }
  
  // Contact person validation
  if (!contact || typeof contact !== 'string' || contact.trim().length < 2) {
    errors.push('Contact name must be at least 2 characters long');
  } else if (contact.trim().length > 100) {
    errors.push('Contact name must be less than 100 characters');
  }
  
  // Email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push('Please provide a valid email address');
  } else if (email.trim().length > 254) {
    errors.push('Email address is too long');
  }
  
  // Phone validation (required for bookings)
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    errors.push('Phone number is required');
  } else {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,20}$/;
    if (!phoneRegex.test(phone.trim())) {
      errors.push('Please provide a valid phone number');
    }
  }
  
  // Booking type validation
  const validBookingTypes = ['Training room hire', 'Pearson Vue testing', 'QCTO Assessment'];
  if (!bookingType || !validBookingTypes.includes(bookingType)) {
    errors.push('Please select a valid booking type');
  }
  
  // Start date validation
  if (!startDate || isNaN(Date.parse(startDate))) {
    errors.push('Please provide a valid start date');
  }
  
  // Message validation
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  } else if (message.trim().length > 5000) {
    errors.push('Message must be less than 5000 characters');
  }
  
  return errors;
}

function checkRateLimit(clientIP) {
  const now = Date.now();
  const fifteenMinutesAgo = now - 15 * 60 * 1000;
  
  if (!submissions.has(clientIP)) {
    submissions.set(clientIP, []);
  }
  
  const userSubmissions = submissions.get(clientIP);
  const recentSubmissions = userSubmissions.filter(time => time > fifteenMinutesAgo);
  
  if (recentSubmissions.length >= 5) {
    return false;
  }
  
  recentSubmissions.push(now);
  submissions.set(clientIP, recentSubmissions);
  return true;
}

function sanitizeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\n/g, '<br>');
}

export async function POST({ request, getClientAddress }) {
  try {
    const clientIP = getClientAddress();
    
    if (!checkRateLimit(clientIP)) {
      return json({
        success: false,
        message: 'Too many submissions. Please try again in 15 minutes.'
      }, { status: 429 });
    }

    // Parse request body with booking form fields
    const { organization, contact, email, phone, bookingType, startDate, message } = await request.json();
    
    // Validate input with booking form fields
    const validationErrors = validateInput(organization, contact, email, phone, bookingType, startDate, message);
    if (validationErrors.length > 0) {
      return json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      }, { status: 400 });
    }

    // Sanitize input
    const sanitizedOrg = organization.trim();
    const sanitizedContact = contact.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = phone.trim();
    const sanitizedBookingType = bookingType.trim();
    const sanitizedStartDate = new Date(startDate).toLocaleDateString();
    const sanitizedMessage = message.trim();

    // Email to business owner
    const mailOptionsToOwner = {
      from: `"${sanitizedContact}" <${EMAIL_USER}>`,
      to: OWNER_EMAIL,
      replyTo: sanitizedEmail,
      subject: `New Booking Request: ${sanitizedBookingType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #21409a; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Booking Request</h1>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <h2 style="color: #21409a;">Booking Details</h2>
            <p><strong>Organization:</strong> ${sanitizeHtml(sanitizedOrg)}</p>
            <p><strong>Contact Person:</strong> ${sanitizeHtml(sanitizedContact)}</p>
            <p><strong>Email:</strong> ${sanitizeHtml(sanitizedEmail)}</p>
            <p><strong>Phone:</strong> ${sanitizeHtml(sanitizedPhone)}</p>
            <p><strong>Booking Type:</strong> ${sanitizeHtml(sanitizedBookingType)}</p>
            <p><strong>Requested Date:</strong> ${sanitizedStartDate}</p>
            <p><strong>IP Address:</strong> ${clientIP}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            
            <h2 style="color: #21409a;">Message</h2>
            <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #E1B12C;">
              ${sanitizeHtml(sanitizedMessage)}
            </div>
          </div>
          <div style="background-color: #21409a; padding: 10px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 12px;">
              This email was sent from your Village Tech booking form
            </p>
          </div>
        </div>
      `,
      text: `
        New Booking Request - Village Tech
        
        Organization: ${sanitizedOrg}
        Contact Person: ${sanitizedContact}
        Email: ${sanitizedEmail}
        Phone: ${sanitizedPhone}
        Booking Type: ${sanitizedBookingType}
        Requested Date: ${sanitizedStartDate}
        IP: ${clientIP}
        Submitted: ${new Date().toLocaleString()}
        
        Message:
        ${sanitizedMessage}
      `
    };

    // Auto-reply email to user
    const mailOptionsToUser = {
      from: `"Village Tech" <${EMAIL_USER}>`,
      to: sanitizedEmail,
      subject: 'Thank you for your booking request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #21409a; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Thank You!</h1>
          </div>
          <div style="padding: 20px;">
            <p>Dear ${sanitizeHtml(sanitizedContact)},</p>
            
            <p>Thank you for your booking request with Village Tech. We have received your details and will process your request shortly.</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #21409a; margin-top: 0;">Your Booking Details:</h3>
              <p><strong>Organization:</strong> ${sanitizeHtml(sanitizedOrg)}</p>
              <p><strong>Booking Type:</strong> ${sanitizeHtml(sanitizedBookingType)}</p>
              <p><strong>Requested Date:</strong> ${sanitizedStartDate}</p>
              <p style="font-style: italic;">${sanitizeHtml(sanitizedMessage)}</p>
            </div>
            
            <p>We will review your request and contact you within 24-48 hours to confirm availability and next steps.</p>
            
            <p>If you have any urgent questions, please call us at <strong>087 135 1313</strong>.</p>
            
            <p>Best regards,<br>
            <strong style="color: #E1B12C;">Village Tech Team</strong></p>
          </div>
          <div style="background-color: #21409a; padding: 10px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 12px;">
              This is an automated response. Please do not reply to this email.
            </p>
          </div>
        </div>
      `,
      text: `
        Dear ${sanitizedContact},
        
        Thank you for your booking request with Village Tech. We have received your details and will process your request shortly.
        
        Your Booking Details:
        Organization: ${sanitizedOrg}
        Booking Type: ${sanitizedBookingType}
        Requested Date: ${sanitizedStartDate}
        Message: ${sanitizedMessage}
        
        We will review your request and contact you within 24-48 hours to confirm availability and next steps.
        
        If you have any urgent questions, please call us at 087 135 1313.
        
        Best regards,
        Village Tech Team
        
        This is an automated response. Please do not reply to this email.
      `
    };

    try {
      await Promise.all([
        transporter.sendMail(mailOptionsToOwner),
        transporter.sendMail(mailOptionsToUser)
      ]);

      console.log(`Booking request from ${sanitizedEmail} sent successfully`);
      
      return json({
        success: true,
        message: 'Your booking request has been sent successfully! We will contact you shortly.'
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      
      try {
        await transporter.sendMail(mailOptionsToOwner);
        console.log('Owner notification sent, but auto-reply failed');
        
        return json({
          success: true,
          message: 'Your booking request has been sent successfully! We will contact you shortly.'
        });
      } catch (criticalError) {
        console.error('Critical email failure:', criticalError);
        throw criticalError;
      }
    }

  } catch (error) {
    console.error('Error in booking form handler:', error);
    return json({
      success: false,
      message: 'There was an error processing your booking request. Please try again later.'
    }, { status: 500 });
  }
}