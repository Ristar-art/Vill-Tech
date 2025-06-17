// test-email.js - Standalone email configuration test
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: process.env.EMAIL_SECURE === 'true'
};

console.log('🧪 Testing Email Configuration...\n');

console.log('Configuration:');
console.log(`  Host: ${config.host}`);
console.log(`  Port: ${config.port}`);
console.log(`  Secure: ${config.secure}`);
console.log(`  User: ${config.user}`);
console.log(`  Pass: ${config.pass ? `***SET*** (${config.pass.length} chars)` : 'NOT SET'}\n`);

// Check for obvious issues
const issues = [];
if (!config.user) issues.push('EMAIL_USER not set');
if (!config.pass) issues.push('EMAIL_PASS not set');
if (!config.host) issues.push('EMAIL_HOST not set');
if (config.pass && (config.pass.includes('secret') || config.pass.includes('/*') || config.pass === 'your_actual_password_here')) {
  issues.push('EMAIL_PASS appears to be a placeholder');
}

if (issues.length > 0) {
  console.error('❌ Configuration Issues:');
  issues.forEach(issue => console.error(`   - ${issue}`));
  console.error('\n💡 Please update your .env file with the correct values');
  process.exit(1);
}

// Test multiple configurations
const testConfigs = [
  {
    name: 'Primary (SSL/TLS Port 465)',
    config: {
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user: config.user, pass: config.pass },
      tls: { rejectUnauthorized: false }
    }
  },
  {
    name: 'Alternative (STARTTLS Port 587)',
    config: {
      host: config.host,
      port: 587,
      secure: false,
      auth: { user: config.user, pass: config.pass },
      tls: { rejectUnauthorized: false }
    }
  },
  {
    name: 'Alternative (Non-secure Port 25)',
    config: {
      host: config.host,
      port: 25,
      secure: false,
      auth: { user: config.user, pass: config.pass },
      tls: { rejectUnauthorized: false }
    }
  }
];

async function testConfiguration(name, transportConfig) {
  console.log(`\n🔧 Testing: ${name}`);
  
  try {
    const transporter = nodemailer.createTransporter({
      ...transportConfig,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
      logger: false, // Disable verbose logging for test
      debug: false
    });

    // Test connection only
    console.log('   ⏳ Verifying connection...');
    await transporter.verify();
    console.log('   ✅ Connection successful!');

    // Test sending email (commented out to avoid spam during testing)
    // Uncomment the next section if you want to actually send test emails
    /*
    console.log('   ⏳ Sending test email...');
    const testEmail = {
      from: config.user,
      to: config.user, // Send to self
      subject: `Test Email - ${name} - ${new Date().toLocaleString()}`,
      text: `This is a test email sent using ${name} configuration.\n\nTimestamp: ${new Date().toISOString()}`
    };

    const result = await transporter.sendMail(testEmail);
    console.log(`   ✅ Email sent successfully! Message ID: ${result.messageId}`);
    */
    
    return true;
  } catch (error) {
    console.log(`   ❌ Failed: ${error.message}`);
    if (error.code === 'EAUTH') {
      console.log('   💡 Authentication failed - check username/password');
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      console.log('   💡 Connection failed - check host/port/firewall');
    } else if (error.code === 'ESOCKET') {
      console.log('   💡 Socket error - try different port/security settings');
    }
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting email configuration tests...');
  
  let successCount = 0;
  
  for (const { name, config: testConfig } of testConfigs) {
    const success = await testConfiguration(name, testConfig);
    if (success) successCount++;
  }

  console.log(`\n📊 Test Results: ${successCount}/${testConfigs.length} configurations successful`);
  
  if (successCount === 0) {
    console.log('\n❌ All tests failed. Common solutions:');
    console.log('   1. ✅ Verify EMAIL_PASS is the correct password');
    console.log('   2. ✅ Check if your email provider requires app-specific passwords');
    console.log('   3. ✅ Ensure SMTP access is enabled for your account');
    console.log('   4. ✅ Try logging into webmail with the same credentials');
    console.log('   5. ✅ Contact your hosting provider for SMTP settings');
    console.log('\n🔍 Next steps:');
    console.log('   - Log into https://webmail.villagetech.co.za with your credentials');
    console.log('   - Check your hosting control panel for SMTP settings');
    console.log('   - Contact your hosting provider (appears to be Xneelo/Hetzner)');
    process.exit(1);
  } else {
    console.log('\n✅ At least one configuration works! Your email setup should be functional.');
    console.log('\n🎯 Recommended configuration for your app:');
    
    // Find the working configuration
    for (let i = 0; i < testConfigs.length; i++) {
      if (i < successCount) {
        const workingConfig = testConfigs[i];
        console.log(`   EMAIL_HOST=${workingConfig.config.host}`);
        console.log(`   EMAIL_PORT=${workingConfig.config.port}`);
        console.log(`   EMAIL_SECURE=${workingConfig.config.secure}`);
        break;
      }
    }
  }
}

// Run the tests
runTests().catch(error => {
  console.error('\n💥 Unexpected error:', error.message);
  process.exit(1);
});





import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import * as nodemailer from 'nodemailer';

// Environment variables for SMTPS
const EMAIL_USER = env.EMAIL_USER;
const EMAIL_PASS = env.EMAIL_PASS;
const OWNER_EMAIL = env.OWNER_EMAIL;
const EMAIL_HOST = env.EMAIL_HOST;
const EMAIL_PORT = parseInt(env.EMAIL_PORT || '465');
const EMAIL_SECURE = env.EMAIL_SECURE === 'true';

// Debug nodemailer import
console.log('nodemailer import:', Object.keys(nodemailer));

// Enhanced validation with detailed error messages
function validateEmailConfig() {
  const errors = [];
  
  if (!EMAIL_USER) {
    errors.push('EMAIL_USER is not set');
  }
  
  // if (!EMAIL_PASS) {
  //   errors.push('EMAIL_PASS is not set');
  // } else if (EMAIL_PASS.includes('secret') || EMAIL_PASS.includes('/*') || EMAIL_PASS.includes('password') || EMAIL_PASS === 'your_password_here') {
  //   errors.push(`EMAIL_PASS  ${EMAIL_PASS} appears to be a placeholder - update with actual password`);
  // }
  
  if (!EMAIL_HOST) {
    errors.push('EMAIL_HOST is not set');
  }
  
  if (!OWNER_EMAIL) {
    errors.push('OWNER_EMAIL is not set');
  }
  
  return errors;
}

// Check configuration on startup
const configErrors = validateEmailConfig();
if (configErrors.length > 0) {
  console.error('❌ Email configuration errors:');
  configErrors.forEach(error => console.error(`   - ${error}`));
  console.error('\n📝 Please check your .env file and ensure all email variables are properly set.');
  console.error('Example .env file:');
  console.error('EMAIL_USER=info@villagetech.co.za');
  console.error('EMAIL_PASS=your_actual_email_password');
  console.error('EMAIL_HOST=mail.villagetech.co.za');
  console.error('EMAIL_PORT=465');
  console.error('EMAIL_SECURE=true');
  console.error('OWNER_EMAIL=info@villagetech.co.za');
  throw new Error('Email configuration is incomplete. Please set EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT, and EMAIL_SECURE in your .env file.');
}

// Debug environment variables (safely)
console.log('📧 Email Configuration:');
console.log(`   EMAIL_USER: ${EMAIL_USER}`);
console.log(`   EMAIL_PASS: ${EMAIL_PASS ? `***set*** (${EMAIL_PASS.length} chars)` : 'NOT SET'}`);
// console.log(`   EMAIL_PASS raw value: ${EMAIL_PASS === '/* secret */' ? 'Invalid placeholder detected' : 'Valid password set'}`);
console.log(`   EMAIL_HOST: ${EMAIL_HOST}`);
console.log(`   EMAIL_PORT: ${EMAIL_PORT}`);
console.log(`   EMAIL_SECURE: ${EMAIL_SECURE}`);
console.log(`   OWNER_EMAIL: ${OWNER_EMAIL}`);

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

// Create multiple transporter configurations for fallback
function createSmtpTransporter() {
  console.log(`🔧 Setting up SMTPS transporter for ${EMAIL_USER} via ${EMAIL_HOST}:${EMAIL_PORT}`);
  
  const primaryConfig = {
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_SECURE,
    auth: {
      user: EMAIL_USER,
      pass: '0031@Village2025'
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV !== 'production' ? false : true
    },
    logger: true,
    debug: process.env.NODE_ENV === 'development',
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
  };

  return nodemailer.createTransport(primaryConfig);
}

// Create fallback transporter for alternative configurations
function createFallbackTransporter() {
  console.log(`🔄 Setting up fallback SMTP transporter (STARTTLS) for ${EMAIL_USER}`);
  
  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV !== 'production' ? false : true
    },
    logger: true,
    debug: process.env.NODE_ENV === 'development',
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
  });
}

const transporter = createSmtpTransporter();
let fallbackTransporter = null;

// Verify SMTP configuration on startup with enhanced error reporting
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Primary SMTP configuration error:', error.message);
    console.error('Error details:', {
      code: error.code,
      response: error.response,
      responseCode: error.responseCode
    });
    
    // Provide specific troubleshooting based on error type
    if (error.code === 'EAUTH') {
      console.error('\n🔐 Authentication Failed - Solutions:');
      console.error('   1. ✅ Verify EMAIL_USER and EMAIL_PASS in your .env file');
      console.error('   2. ✅ Ensure EMAIL_PASS is the actual password (not a placeholder)');
      console.error('   3. ✅ Try logging into webmail with these exact credentials');
      console.error('   4. ✅ Check if your email provider requires app-specific passwords');
      console.error('   5. ✅ Verify SMTP access is enabled for this email account');
      console.error('   6. ✅ Contact your hosting provider to confirm SMTP settings');
      console.error(`\n   Current config: ${EMAIL_USER} → ${EMAIL_HOST}:${EMAIL_PORT} (secure: ${EMAIL_SECURE})`);
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      console.error('\n🌐 Connection Failed - Check:');
      console.error(`   1. EMAIL_HOST (${EMAIL_HOST}) and EMAIL_PORT (${EMAIL_PORT}) are correct`);
      console.error('   2. Firewall/network allows connections to the SMTP server');
      console.error('   3. Server is not blocking your IP address');
      console.error('   4. DNS resolution is working for the email host');
    } else if (error.code === 'ESOCKET') {
      console.error('\n🔌 Socket Error - Try:');
      console.error('   1. Different port (587 for STARTTLS, 465 for SSL)');
      console.error('   2. Toggle EMAIL_SECURE setting');
      console.error('   3. Check if the email server is online');
    }
    
    // Try to set up fallback transporter
    console.log('\n🔄 Attempting to set up fallback configuration...');
    fallbackTransporter = createFallbackTransporter();
    
    fallbackTransporter.verify((fallbackError, fallbackSuccess) => {
      if (fallbackError) {
        console.error('❌ Fallback configuration also failed:', fallbackError.message);
        console.error('\n⚠️ Email functionality will be limited. Please fix configuration before production.');
      } else {
        console.log('✅ Fallback SMTP configuration successful - will use STARTTLS on port 587');
      }
    });
    
  } else {
    console.log(`✅ Primary SMTPS server for ${EMAIL_USER} is ready to send messages`);
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
  
  // // Phone validation (optional but if provided, should be valid)
  // if (phone && typeof phone === 'string' && phone.trim().length > 0) {
  //   const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,20}$/;
  //   const trimmedPhone = phone.trim电池
  //   if (!phoneRegex.test(trimmedPhone)) {
  //     errors.push('Please provide a valid phone number');
  //   }
  // }
  
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
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '"')
    .replace(/\n/g, '<br>');
}

// Enhanced email sending function with fallback
async function sendEmailWithFallback(mailOptions) {
  let lastError = null;
  
  // Try primary transporter first
  try {
    console.log('📧 Attempting to send email with primary configuration...');
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully with primary configuration');
    return result;
  } catch (error) {
    console.warn('⚠️ Primary email configuration failed:', error.message);
    lastError = error;
    
    // Try fallback transporter if available
    if (fallbackTransporter) {
      try {
        console.log('📧 Attempting to send email with fallback configuration...');
        const result = await fallbackTransporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully with fallback configuration');
        return result;
      } catch (fallbackError) {
        console.error('❌ Fallback email configuration also failed:', fallbackError.message);
        lastError = fallbackError;
      }
    }
    
    // If both failed, throw the last error
    throw lastError;
  }
}

// Main POST handler
export async function POST({ request, getClientAddress }) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientAddress();
    console.log(`📬 New contact form submission from IP: ${clientIP}`);
    
    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      console.warn(`🚫 Rate limit exceeded for IP: ${clientIP}`);
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
      console.error('❌ JSON parsing error:', parseError.message);
      return json({
        success: false,
        message: 'Invalid request format. Please check your data and try again.'
      }, { status: 400 });
    }

    const { name, email, phone, subject, message } = requestBody;
    console.log(`📝 Contact form data received from: ${email}`);
    
    // Validate input
    const validationErrors = validateInput(name, email, phone, subject, message);
    if (validationErrors.length > 0) {
      console.warn('❌ Validation failed:', validationErrors);
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

    console.log(`✅ Input validated and sanitized for: ${sanitizedName} <${sanitizedEmail}>`);

    // Email to business owner (sent via SMTPS)
    const mailOptionsToOwner = {
      to: OWNER_EMAIL, 
      from: `"${sanitizedName}" <${EMAIL_USER}>`, // From your authenticated email
      replyTo: sanitizedEmail, // Allow direct reply to customer
      subject: `Contact Form: ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd;"></div>
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
ទ
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
This email was sent intron your Village Tech contact form
Reply directly to this email to respond to the customer.
      `
    };

    // Auto-reply email to user (sent via SMTPS)
    const mailOptionsToUser = {
      to: sanitizedEmail,
      from: `"Village Tech" <${EMAIL_USER}>`, // Your sending email address
      subject: "Thank you for contacting Village Tech - We'll be in touch soon!'",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd;"></div>
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
            
            <div style="background部分
background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #21409a; margin-top: 0;">Your Message Summary:</h3>
              <p><strong>Subject:</strong> ${sanitizeHtml(sanitizedSubject)}</p>
              <p style="font-style: italic; background-color: white; padding: 10px; border-radius: 3px; line-height: 1.6;">
                ${sanitizeHtml(sanitizedMessage)}
              </p>
            </div>
            
            <div style="background-color: #21409a; color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: white;">Visit Us</h3>
              <p style="margin: 5px 0;"><strong>Address:</strong> Village Tech Training Solutions</p>
              <p style="margin: 5px 0;">85 Main St, Ground Floor</p>
              <p style="margin: 5px 0;">Johannesburg, 2107, South Africa</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> info@villagetech.co.za</p>
              <p style="margin: 5px 0;"><strong>Website:</strong> villagetech.co.za</p>
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
Email: info@villagetech.co.za
Website: villagetech.co.za

Best regards,
The Village Tech Team

---
This is an automated response. Please do not reply to this email.
If you need immediate assistance, please contact us directly.
Message sent on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
      `
    };

    // Send both emails with comprehensive error handling and fallback
    try {
      console.log('📤 Sending owner notification email...');
      console.log('📤 Sending user auto-reply email...');
      
      const results = await Promise.allSettled([
        sendEmailWithFallback(mailOptionsToOwner),
        sendEmailWithFallback(mailOptionsToUser)
      ]);

      const ownerEmailResult = results[0];
      const userEmailResult = results[1];

      // Check if owner email was sent successfully
      if (ownerEmailResult.status === 'rejected') {
        console.error('❌ Failed to send owner notification:', ownerEmailResult.reason?.message);
        throw new Error('Failed to send notification to business owner');
      }

      // Log results for user email
      if (userEmailResult.status === 'fulfilled') {
        console.log(`✅ Contact form submission from ${sanitizedEmail} processed successfully - both emails sent`);
      } else {
        console.warn(`⚠️ Owner notification sent, but auto-reply to user failed for ${sanitizedEmail}:`, userEmailResult.reason?.message);
      }
      
      return json({
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.'
      });

    } catch (emailError) {
      console.error('❌ Critical email sending error:', emailError.message);
      console.error('Error details:', {
        code: emailError.code,
        response: emailError.response,
        command: emailError.command
      });
      
      // Return error response with helpful information
      return json({
        success: false,
        message: 'There was an error sending your message. Please try again later or contact us directly at info@villagetech.co.za.'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Unexpected error in contact form handler:', error.message);
    console.error('Stack trace:', error.stack);
    return json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.'
    }, { status: 500 });
  }
}

// GET handler for health checks with enhanced diagnostics
export async function GET() {
  // Test email configuration
  let emailStatus = 'unknown';
  let connectionTest = null;
  
  try {
    await transporter.verify();
    emailStatus = 'primary_connected';
    connectionTest = { primary: true, fallback: null };
  } catch (primaryError) {
    if (fallbackTransporter) {
      try {
        await fallbackTransporter.verify();
        emailStatus = 'fallback_connected';
        connectionTest = { primary: false, fallback: true };
      } catch (fallbackError) {
        emailStatus = 'all_failed';
        connectionTest = { primary: false, fallback: false };
      }
    } else {
      emailStatus = 'primary_failed_no_fallback';
      connectionTest = { primary: false, fallback: null };
    }
  }

  return json({
    status: 'Contact form API is running with SMTPS',
    timestamp: new Date().toISOString(),
    emailStatus,
    connectionTest,
    rateLimit: {
      activeIps: submissions.size,
      cleanupInterval: '1 hour'
    },
    emailConfig: {
      provider: 'SMTP',
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: EMAIL_SECURE,
      authType: 'User/Pass',
      fromAddress: EMAIL_USER,
      toOwnerAddress: OWNER_EMAIL,
      fallbackAvailable: !!fallbackTransporter
    },
    environment: {
      nodeEnv: process.env.NODE_ENV,
      configValidation: validateEmailConfig()
    }
  });
}