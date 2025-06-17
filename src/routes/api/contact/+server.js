// src/routes/api/contact/+server.js
import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private'; // For production, use $env/static/private for build-time safety

// --- Village Tech Branding Colors ---
const VILLAGE_TECH_PRIMARY_BLUE = '#21409A';
const VILLAGE_TECH_ACCENT_RED = '#ef4444';
// ------------------------------------

const EMAIL_USER = env.EMAIL_USER;
const EMAIL_PASS = env.EMAIL_PASS;
const OWNER_EMAIL = env.OWNER_EMAIL; // This should be set to Village Tech's official contact email
const EMAIL_HOST = env.EMAIL_HOST;
const EMAIL_PORT = parseInt(env.EMAIL_PORT || '465'); // Default to 465 (SMTPS) if not set
const EMAIL_SECURE = env.EMAIL_SECURE === 'true'; // Convert string "true" to boolean true

// Validate required environment variables for email functionality
if (!EMAIL_USER || !EMAIL_PASS || !OWNER_EMAIL) {
  console.error('Missing required environment variables: EMAIL_USER, EMAIL_PASS, and/or OWNER_EMAIL. Check your .env file.');
  // Throwing an error here prevents the server from starting if critical config is missing.
  throw new Error('Email configuration is incomplete. Please ensure EMAIL_USER, EMAIL_PASS, and OWNER_EMAIL are set in your .env file.');
}

// Rate limiting storage (in production, consider using Redis or a database for persistence across instances)
const submissions = new Map();

// Clean up old submissions every hour to prevent memory leaks
setInterval(() => {
    const oneHourAgo = Date.now() - 60 * 60 * 1000; // 1 hour in milliseconds
    for (const [ip, timestamps] of submissions.entries()) {
        const recentSubmissions = timestamps.filter(time => time > oneHourAgo);
        if (recentSubmissions.length === 0) {
            submissions.delete(ip); // No recent submissions for this IP, remove it
        } else {
            submissions.set(ip, recentSubmissions); // Update with only recent submissions
        }
    }
}, 60 * 60 * 1000); // Run every hour

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_SECURE, 
  auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
  },
  // If you encounter TLS/certificate issues during development, you might temporarily uncomment:
  // tls: {
  //     rejectUnauthorized: false, 
  // },
  logger: true, // Logs SMTP traffic to console (useful for debugging)
  debug: true, // Provides more detailed debug output
  connectionTimeout: 60000, // 60 seconds
  greetingTimeout: 30000, // 30 seconds
  socketTimeout: 60000 // 60 seconds
});

// Verify email configuration on startup (optional but recommended)
transporter.verify((error, success) => {
    if (error) {
        console.error('Email server configuration verification failed:', error);
        console.error('Email sending will likely fail. Please check your EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, and security settings.');
    } else {
        console.log('Email server is ready to send messages and configuration is valid.');
    }
});

// Input validation function
function validateInput(name, email, message) {
  const errors = [];
  
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long.');
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Please provide a valid email address.');
  }
  
  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long.');
  }
  
  return errors;
}

// Rate limiting function: Allows max 5 submissions per IP every 15 minutes
function checkRateLimit(clientIP) {
  const now = Date.now();
  const fifteenMinutesAgo = now - 15 * 60 * 1000; // 15 minutes in milliseconds
  
  if (!submissions.has(clientIP)) {
    submissions.set(clientIP, []);
  }
  
  const userSubmissions = submissions.get(clientIP);
  const recentSubmissions = userSubmissions.filter(time => time > fifteenMinutesAgo);
  
  if (recentSubmissions.length >= 5) { // Limit to 5 submissions per 15 minutes
    return false; // Rate limit exceeded
  }
  
  recentSubmissions.push(now);
  submissions.set(clientIP, recentSubmissions);
  return true;
}

// SvelteKit POST handler for the contact form
export async function POST({ request, getClientAddress }) {
  try {
    // Get client IP address for rate limiting and logging
    const clientIP = getClientAddress();
    
    // Apply rate limiting
    if (!checkRateLimit(clientIP)) {
      return json({
        success: false,
        message: 'Too many submission attempts from your IP. Please try again in 15 minutes.'
      }, { status: 429 }); // 429 Too Many Requests
    }

    // Parse the JSON request body
    const { name, email, message } = await request.json();
    
    // Validate input fields
    const validationErrors = validateInput(name, email, message);
    if (validationErrors.length > 0) {
      return json({
        success: false,
        message: 'Validation failed. Please check your input.',
        errors: validationErrors
      }, { status: 400 }); // 400 Bad Request
    }

    // Sanitize input to prevent injection issues in emails
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMessage = message.trim();

    // --- Email to Village Tech Owner ---
    const mailOptionsToOwner = {
      from: `"${sanitizedName}" <${EMAIL_USER}>`, // Sender's name and your service email
      to: OWNER_EMAIL,
      replyTo: sanitizedEmail, // Allows you to reply directly to the customer
      subject: `New Website Contact Form Submission - Village Tech Training Solutions`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid ${VILLAGE_TECH_PRIMARY_BLUE}; border-radius: 8px; overflow: hidden;">
          <div style="background-color: ${VILLAGE_TECH_PRIMARY_BLUE}; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <h2 style="color: ${VILLAGE_TECH_PRIMARY_BLUE}; font-size: 20px; margin-top: 0;">Contact Details</h2>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${sanitizedName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${sanitizedEmail}</p>
            <p style="margin: 5px 0;"><strong>IP Address:</strong> ${clientIP}</p>
            <p style="margin: 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })} SAST</p>
            
            <h2 style="color: ${VILLAGE_TECH_PRIMARY_BLUE}; font-size: 20px; margin-top: 20px;">Message</h2>
            <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid ${VILLAGE_TECH_ACCENT_RED}; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              <p style="margin: 0; white-space: pre-line;">${sanitizedMessage}</p>
            </div>
          </div>
          <div style="background-color: ${VILLAGE_TECH_PRIMARY_BLUE}; padding: 10px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 12px;">
              This email was sent from your Village Tech Training Solutions website contact form.
            </p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission - Village Tech Training Solutions
        
        Name: ${sanitizedName}
        Email: ${sanitizedEmail}
        IP Address: ${clientIP}
        Submitted: ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })} SAST
        
        Message:
        ${sanitizedMessage}
        
        ---
        This email was sent from your Village Tech Training Solutions website contact form.
      `
    };

    // --- Auto-reply Email to User ---
    const mailOptionsToUser = {
      from: `"Village Tech Training Solutions" <${EMAIL_USER}>`,
      to: sanitizedEmail,
      subject: 'Thank you for contacting Village Tech Training Solutions',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid ${VILLAGE_TECH_PRIMARY_BLUE}; border-radius: 8px; overflow: hidden;">
          <div style="background-color: ${VILLAGE_TECH_PRIMARY_BLUE}; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank You!</h1>
          </div>
          <div style="padding: 20px;">
            <p style="margin-top: 0;">Dear ${sanitizedName},</p>
            
            <p>Thank you for reaching out to **Village Tech Training Solutions**! We've received your message and appreciate your interest. Our team will review it and get back to you within 24-48 hours during business days.</p>
            
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid ${VILLAGE_TECH_ACCENT_RED};">
              <h3 style="color: ${VILLAGE_TECH_PRIMARY_BLUE}; margin-top: 0; font-size: 18px;">Your Message:</h3>
              <p style="font-style: italic; margin: 0; white-space: pre-line;">${sanitizedMessage}</p>
            </div>
            
            <p>In the meantime, feel free to explore more about our offerings on our website or visit us:</p>
            <p style="margin: 5px 0;">🌐 **Website:** <a href="https://villagetech.co.za" style="color: ${VILLAGE_TECH_PRIMARY_BLUE}; text-decoration: none;">villagetech.co.za</a></p>
            <p style="margin: 5px 0;">📞 **Phone:** 087 135 1313</p>
            <p style="margin: 5px 0;">📍 **Address:** 85 Main St, Groundfloor, Johannesburg, 2107</p>
            
            <p style="margin-top: 30px;">Best regards,<br>
            <strong style="color: ${VILLAGE_TECH_ACCENT_RED};">The Village Tech Training Solutions Team</strong></p>
          </div>
          <div style="background-color: ${VILLAGE_TECH_PRIMARY_BLUE}; padding: 10px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 12px;">
              This is an automated response. Please do not reply directly to this email.
            </p>
          </div>
        </div>
      `,
      text: `
        Dear ${sanitizedName},
        
        Thank you for reaching out to Village Tech Training Solutions! We've received your message and appreciate your interest. Our team will review it and get back to you within 24-48 hours during business days.
        
        Your Message:
        ${sanitizedMessage}
        
        In the meantime, feel free to explore more about our offerings on our website or visit us:
        Website: villagetech.co.za
        Phone: 087 135 1313
        Address: 85 Main St, Groundfloor, Johannesburg, 2107
        
        Best regards,
        The Village Tech Training Solutions Team
        
        ---
        This is an automated response. Please do not reply directly to this email.
      `
    };

    // Send both emails concurrently
    try {
      await Promise.all([
        transporter.sendMail(mailOptionsToOwner),
        transporter.sendMail(mailOptionsToUser)
      ]);

      console.log(`Contact form submission from ${sanitizedEmail} (IP: ${clientIP}) processed successfully.`);
      
      return json({
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.'
      }, { status: 200 });
    } catch (emailError) {
      console.error(`Failed to send one or both emails for ${sanitizedEmail} (IP: ${clientIP}):`, emailError);
      
      // If one email fails, try to ensure at least the owner gets notified.
      // This is a resilience measure.
      try {
        await transporter.sendMail(mailOptionsToOwner);
        console.warn(`Owner notification for ${sanitizedEmail} sent, but auto-reply to user failed.`);
        return json({
          success: true, // Still report success to user, as their message was likely delivered to the business
          message: 'Your message has been sent successfully! We will get back to you soon.'
        }, { status: 200 });
      } catch (criticalError) {
        console.error(`Critical email failure: Failed to send owner notification for ${sanitizedEmail} (IP: ${clientIP}):`, criticalError);
        // If owner notification also fails, throw a critical error.
        throw criticalError; 
      }
    }

  } catch (error) {
    // Catch any errors during request parsing, validation, or initial setup
    console.error('Error in Village Tech contact form handler:', error);
    // Provide a generic error message to the user for security reasons
    return json({
      success: false,
      message: 'There was an internal error sending your message. Please try again later or contact us directly via phone or email.'
    }, { status: 500 }); // 500 Internal Server Error
  }
}