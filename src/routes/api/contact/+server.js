// src/routes/api/contact/+server.js
import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import dns from 'node:dns';

// Force DNS to resolve IPv4 addresses
dns.setDefaultResultOrder('ipv4first');
// Environment variables
const EMAIL_USER = env.EMAIL_USER;
const EMAIL_PASS = env.EMAIL_PASS;
const OWNER_EMAIL = env.OWNER_EMAIL;
const EMAIL_HOST = env.EMAIL_HOST || 'smtp-mail.outlook.com'; // Default to Microsoft 365
const EMAIL_PORT = parseInt(env.EMAIL_PORT || '587'); // Default to 587 for Microsoft 365
const EMAIL_SECURE = env.EMAIL_SECURE === 'true'; // Convert string "true" to boolean
const EMAIL_SERVICE = env.EMAIL_SERVICE; // Optional: 'outlook', 'gmail', etc.

// OAuth2 credentials (optional for Microsoft 365)
const OAUTH_CLIENT_ID = env.OAUTH_CLIENT_ID;
const OAUTH_CLIENT_SECRET = env.OAUTH_CLIENT_SECRET;
const OAUTH_REFRESH_TOKEN = env.OAUTH_REFRESH_TOKEN;
const OAUTH_ACCESS_TOKEN = env.OAUTH_ACCESS_TOKEN;

// Validate required environment variables
if (!EMAIL_USER || !EMAIL_PASS) {
  console.error('Missing required environment variables: EMAIL_USER and/or EMAIL_PASS');
  throw new Error('Email configuration is incomplete. Please set EMAIL_USER and EMAIL_PASS in your .env file.');
}

if (!OWNER_EMAIL) {
  console.warn('OWNER_EMAIL not set. Using EMAIL_USER as fallback.');
}

// Resolve and log IP for debugging
dns.resolve4('smtp-mail.outlook.com', (err, addresses) => {
  if (err) {
    console.error('DNS resolution error:', err);
  } else {
    console.log('Resolved smtp-mail.outlook.com to IPv4:', addresses);
  }
});
// Rate limiting storage (in production, use Redis or database)
const submissions = new Map();

// Clean up old submissions every hour
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

// Create transporter with support for multiple email providers
function createEmailTransporter() {
  // OAuth2 configuration for Microsoft 365 (recommended)
  if (OAUTH_CLIENT_ID && OAUTH_CLIENT_SECRET && OAUTH_REFRESH_TOKEN) {
    console.log('Using OAuth2 authentication for Microsoft 365');
    return nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false, // Use STARTTLS
      auth: {
        type: 'OAuth2',
        user: EMAIL_USER,
        clientId: OAUTH_CLIENT_ID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN,
        accessToken: OAUTH_ACCESS_TOKEN
      },
      tls: {
        rejectUnauthorized: true, // Enforce valid certificates
        servername: 'smtp-mail.outlook.com'
      },
      logger: true,
      debug: process.env.NODE_ENV === 'development',
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000
    });
  }

  // Custom SMTP configuration
  console.log('Using custom SMTP configuration: smtp-mail.outlook.com:587');
  return nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: true, // Set to false only for testing if TLS errors occur
      servername: 'smtp-mail.outlook.com'
    },
    logger: true,
    debug: process.env.NODE_ENV === 'development',
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
  });
}

const transporter = createEmailTransporter();

// Verify email configuration on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('Email configuration error:', error);
        console.error('Please check your email settings and credentials.');
    } else {
        console.log('Email server is ready to send messages');
        console.log(`Using email service: ${EMAIL_HOST || EMAIL_SERVICE}`);
    }
});

// Enhanced input validation function
function validateInput(name, email, phone, subject, message) {
  const errors = [];
  
  // Name validation
  if (!name || typeof name !== 'string') {
    errors.push('Name is required');
  } else {
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      errors.push('Name must be at least 2 characters long');
    } else if (trimmedName.length > 100) {
      errors.push('Name must be less than 100 characters');
    } else if (!/^[a-zA-Z\s\-'\.]+$/.test(trimmedName)) {
      errors.push('Name contains invalid characters');
    }
  }
  
  // Email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
  } else {
    const trimmedEmail = email.trim();
    if (!emailRegex.test(trimmedEmail)) {
      errors.push('Please provide a valid email address');
    } else if (trimmedEmail.length > 254) {
      errors.push('Email address is too long');
    }
  }
  
  // Phone validation (optional but if provided, should be valid)
  if (phone && typeof phone === 'string' && phone.trim().length > 0) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,20}$/;
    const trimmedPhone = phone.trim();
    if (!phoneRegex.test(trimmedPhone)) {
      errors.push('Please provide a valid phone number');
    }
  }
  
  // Subject validation (optional)
  if (subject && typeof subject === 'string') {
    const trimmedSubject = subject.trim();
    if (trimmedSubject.length > 200) {
      errors.push('Subject must be less than 200 characters');
    }
  }
  
  // Message validation
  if (!message || typeof message !== 'string') {
    errors.push('Message is required');
  } else {
    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 10) {
      errors.push('Message must be at least 10 characters long');
    } else if (trimmedMessage.length > 5000) {
      errors.push('Message must be less than 5000 characters');
    }
  }
  
  return errors;
}

// Rate limiting function
function checkRateLimit(clientIP) {
  const now = Date.now();
  const fifteenMinutesAgo = now - 15 * 60 * 1000;
  
  if (!submissions.has(clientIP)) {
    submissions.set(clientIP, []);
  }
  
  const userSubmissions = submissions.get(clientIP);
  const recentSubmissions = userSubmissions.filter(time => time > fifteenMinutesAgo);
  
  if (recentSubmissions.length >= 5) {
    return false; // Rate limit exceeded
  }
  
  recentSubmissions.push(now);
  submissions.set(clientIP, recentSubmissions);
  return true;
}

// Sanitize HTML content to prevent XSS
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

// Main POST handler
export async function POST({ request, getClientAddress }) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientAddress();
    
    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return json({
        success: false,
        message: 'Too many submissions. Please try again in 15 minutes.'
      }, { status: 429 });
    }

    // Parse request body with error handling
    let requestBody;
    try {
      requestBody = await request.json();
    } catch (parseError) {
      return json({
        success: false,
        message: 'Invalid request format. Please check your data and try again.'
      }, { status: 400 });
    }

    const { name, email, phone, subject, message } = requestBody;
    
    // Validate input
    const validationErrors = validateInput(name, email, phone, subject, message);
    if (validationErrors.length > 0) {
      return json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      }, { status: 400 });
    }

    // Sanitize input
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = phone ? phone.trim() : '';
    const sanitizedSubject = subject ? subject.trim() : 'New Contact Form Submission';
    const sanitizedMessage = message.trim();

    // Email to business owner
    const mailOptionsToOwner = {
      from: `"${sanitizedName}" <${EMAIL_USER}>`,
      to: OWNER_EMAIL || EMAIL_USER,
      replyTo: sanitizedEmail,
      subject: `Contact Form: ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd;">
          <div style="background-color: #21409a; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <h2 style="color: #21409a; margin-top: 0;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td style="padding: 8px 0;">${sanitizeHtml(sanitizedName)}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${sanitizedEmail}">${sanitizeHtml(sanitizedEmail)}</a></td></tr>
              ${sanitizedPhone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${sanitizedPhone}">${sanitizeHtml(sanitizedPhone)}</a></td></tr>` : ''}
              ${sanitizedSubject !== 'New Contact Form Submission' ? `<tr><td style="padding: 8px 0; font-weight: bold;">Subject:</td><td style="padding: 8px 0;">${sanitizeHtml(sanitizedSubject)}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; font-weight: bold;">IP Address:</td><td style="padding: 8px 0;">${clientIP}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Submitted:</td><td style="padding: 8px 0;">${new Date().toLocaleString()}</td></tr>
            </table>
            
            <h2 style="color: #21409a; margin-top: 30px;">Message</h2>
            <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #E1B12C; line-height: 1.6;">
              ${sanitizeHtml(sanitizedMessage)}
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e8f4fd; border-radius: 5px;">
              <p style="margin: 0; font-size: 14px; color: #21409a;">
                <strong>Quick Actions:</strong><br>
                Reply directly to this email to respond to ${sanitizedName}<br>
                Email: <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a>
                ${sanitizedPhone ? `<br>Call: <a href="tel:${sanitizedPhone}">${sanitizedPhone}</a>` : ''}
              </p>
            </div>
          </div>
          <div style="background-color: #21409a; padding: 15px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 12px;">
              This email was sent from your Village Tech contact form<br>
              Received on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission - Village Tech

Contact Details:
================
Name: ${sanitizedName}
Email: ${sanitizedEmail}
${sanitizedPhone ? `Phone: ${sanitizedPhone}` : ''}
${sanitizedSubject !== 'New Contact Form Submission' ? `Subject: ${sanitizedSubject}` : ''}
IP Address: ${clientIP}
Submitted: ${new Date().toLocaleString()}

Message:
========
${sanitizedMessage}

---
This email was sent from your Village Tech contact form
Reply directly to this email to respond to the customer.
      `
    };

    // Auto-reply email to user
    const mailOptionsToUser = {
      from: `"Village Tech" <${EMAIL_USER}>`,
      to: sanitizedEmail,
      subject: 'Thank you for contacting Village Tech - We\'ll be in touch soon!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd;">
          <div style="background-color: #21409a; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank You!</h1>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 16px;">Dear ${sanitizeHtml(sanitizedName)},</p>
            
            <p style="line-height: 1.6;">Thank you for your interest in Village Tech Training Solutions. We have received your message and appreciate you taking the time to contact us.</p>
            
            <div style="background-color: #f0f8ff; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #21409a;">
              <h3 style="color: #21409a; margin-top: 0; font-size: 18px;">What happens next?</h3>
              <ul style="margin: 10px 0; padding-left: 20px; line-height: 1.6;">
                <li>Our team will review your message within 2-4 business hours</li>
                <li>You'll receive a personalized response within 24-48 hours</li>
                <li>If urgent, feel free to call us directly</li>
              </ul>
            </div>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #21409a; margin-top: 0;">Your Message Summary:</h3>
              ${sanitizedSubject !== 'New Contact Form Submission' ? `<p><strong>Subject:</strong> ${sanitizeHtml(sanitizedSubject)}</p>` : ''}
              <p style="font-style: italic; background-color: white; padding: 10px; border-radius: 3px; line-height: 1.6;">
                ${sanitizeHtml(sanitizedMessage)}
              </p>
            </div>
            
            <div style="background-color: #21409a; color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: white;">Visit Us</h3>
              <p style="margin: 5px 0;"><strong>Address:</strong> Village Tech Training Solutions</p>
              <p style="margin: 5px 0;">85 Main St, Ground Floor</p>
              <p style="margin: 5px 0;">Johannesburg, 2107, South Africa</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> info@villagetech.ca.za</p>
              <p style="margin: 5px 0;"><strong>Website:</strong> villagetech.ca.za</p>
            </div>
            
            <p style="margin-top: 30px;">Best regards,<br>
            <strong style="color: #E1B12C; font-size: 18px;">The Village Tech Team</strong></p>
          </div>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; border-top: 1px solid #ddd;">
            <p style="color: #666; margin: 0; font-size: 12px;">
              This is an automated response. Please do not reply to this email.<br>
              If you need immediate assistance, please contact us directly.<br>
              Message sent on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      `,
      text: `
Dear ${sanitizedName},

Thank you for your interest in Village Tech Training Solutions. We have received your message and appreciate you taking the time to contact us.

What happens next?
==================
- Our team will review your message within 2-4 business hours
- You'll receive a personalized response within 24-48 hours  
- If urgent, feel free to call us directly

Your Message Summary:
====================
${sanitizedSubject !== 'New Contact Form Submission' ? `Subject: ${sanitizedSubject}` : ''}
${sanitizedMessage}

Visit Us:
=========
Village Tech Training Solutions
85 Main St, Ground Floor
Johannesburg, 2107, South Africa
Email: info@villagetech.ca.za
Website: villagetech.ca.za

Best regards,
The Village Tech Team

---
This is an automated response. Please do not reply to this email.
If you need immediate assistance, please contact us directly.
Message sent on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
      `
    };

    // Send both emails with comprehensive error handling
    try {
      const results = await Promise.allSettled([
        transporter.sendMail(mailOptionsToOwner),
        transporter.sendMail(mailOptionsToUser)
      ]);

      const ownerEmailResult = results[0];
      const userEmailResult = results[1];

      // Check if owner email was sent successfully
      if (ownerEmailResult.status === 'rejected') {
        console.error('Failed to send owner notification:', ownerEmailResult.reason);
        throw new Error('Failed to send notification to business owner');
      }

      // Log results
      if (userEmailResult.status === 'fulfilled') {
        console.log(`Contact form submission from ${sanitizedEmail} processed successfully - both emails sent`);
      } else {
        console.warn(`Owner notification sent, but auto-reply failed for ${sanitizedEmail}:`, userEmailResult.reason);
      }
      
      return json({
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.'
      });

    } catch (emailError) {
      console.error('Critical email sending error:', emailError);
      
      // Return error response
      return json({
        success: false,
        message: 'There was an error sending your message. Please try again later or contact us directly.'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Unexpected error in contact form handler:', error);
    return json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.'
    }, { status: 500 });
  }
}

// Optional: Add a GET handler for health checks
export async function GET() {
  return json({
    status: 'Contact form API is running',
    timestamp: new Date().toISOString(),
    emailConfig: {
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: EMAIL_SECURE,
      service: EMAIL_SERVICE || 'custom',
      authType: OAUTH_CLIENT_ID ? 'OAuth2' : 'Basic'
    }
  });
}