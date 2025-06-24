// import { json } from '@sveltejs/kit';
// import { env } from '$env/dynamic/private';
// import * as nodemailer from 'nodemailer';

// // Environment variables for SMTPS
// const EMAIL_USER = env.EMAIL_USER;
// const EMAIL_PASS = env.EMAIL_PASS;
// const OWNER_EMAIL = env.OWNER_EMAIL;
// const EMAIL_HOST = env.EMAIL_HOST;
// const EMAIL_PORT = parseInt(env.EMAIL_PORT || '465'); // Default to SMTPS port
// const EMAIL_SECURE = env.EMAIL_SECURE !== 'false'; // Default to true for SMTPS

// // Debug nodemailer import
// console.log('nodemailer import:', Object.keys(nodemailer));

// // Enhanced validation with detailed error messages
// function validateEmailConfig() {
//   const errors = [];
  
//   if (!EMAIL_USER) {
//     errors.push('EMAIL_USER is not set');
//   }
  
//   if (!EMAIL_PASS) {
//     errors.push('EMAIL_PASS is not set');
//   } else if (EMAIL_PASS.includes('secret') || EMAIL_PASS.includes('/*') || EMAIL_PASS.includes('password') || EMAIL_PASS === 'your_password_here' || EMAIL_PASS === '/* secret */') {
//     errors.push(`EMAIL_PASS contains placeholder value "${EMAIL_PASS}" - update with actual password`);
//   }
  
//   if (!EMAIL_HOST) {
//     errors.push('EMAIL_HOST is not set');
//   }
  
//   if (!OWNER_EMAIL) {
//     errors.push('OWNER_EMAIL is not set');
//   }

//   // Validate SMTPS configuration
//   if (EMAIL_PORT !== 465 && EMAIL_SECURE) {
//     errors.push(`Warning: Using secure=true with port ${EMAIL_PORT}. SMTPS typically uses port 465`);
//   }
  
//   return errors;
// }

// // Check configuration on startup
// const configErrors = validateEmailConfig();
// if (configErrors.length > 0) {
//   console.error('❌ Email configuration errors:');
//   configErrors.forEach(error => console.error(`   - ${error}`));
//   console.error('\n📝 Please check your .env file and ensure all email variables are properly set.');
//   console.error('Example .env file for SMTPS:');
//   console.error('EMAIL_USER=info@villagetech.co.za');
//   console.error('EMAIL_PASS=your_actual_email_password');
//   console.error('EMAIL_HOST=mail.villagetech.co.za');
//   console.error('EMAIL_PORT=465');
//   console.error('EMAIL_SECURE=true');
//   console.error('OWNER_EMAIL=info@villagetech.co.za');
  
//   // Only throw error for critical missing configs
//   const criticalErrors = configErrors.filter(error => 
//     !error.includes('Warning') && !error.includes('placeholder')
//   );
//   if (criticalErrors.length > 0) {
//     throw new Error('Critical email configuration is incomplete. Please set EMAIL_USER, EMAIL_PASS, EMAIL_HOST, and OWNER_EMAIL in your .env file.');
//   }
// }

// // Debug environment variables (safely)
// console.log('📧 SMTPS Email Configuration:');
// console.log(`   EMAIL_USER: ${EMAIL_USER}`);
// console.log(`   EMAIL_PASS: ${EMAIL_PASS ? `***${EMAIL_PASS === '/* secret */' ? 'PLACEHOLDER-DETECTED' : 'set'}*** (${EMAIL_PASS.length} chars)` : 'NOT SET'}`);
// console.log(`   EMAIL_PASS raw check: "${EMAIL_PASS}" === "/* secret */" = ${EMAIL_PASS === '/* secret */'}`);
// console.log(`   EMAIL_PASS raw check: "${EMAIL_PASS}" === "0013@Village2025" = ${EMAIL_PASS === '0013@Village2025'}`);
// console.log(`   EMAIL_HOST: ${EMAIL_HOST}`);
// console.log(`   EMAIL_PORT: ${EMAIL_PORT} (SMTPS: ${EMAIL_PORT === 465 ? 'Yes' : 'No'})`);
// console.log(`   EMAIL_SECURE: ${EMAIL_SECURE} (SSL/TLS from start: ${EMAIL_SECURE ? 'Yes' : 'No'})`);
// console.log(`   OWNER_EMAIL: ${OWNER_EMAIL}`);

// // Rate limiting storage (in production, use Redis or database)
// const submissions = new Map();

// // Clean up old submissions every hour
// setInterval(() => {
//   const oneHourAgo = Date.now() - 60 * 60 * 1000;
//   for (const [ip, timestamps] of submissions.entries()) {
//     const recentSubmissions = timestamps.filter(time => time > oneHourAgo);
//     if (recentSubmissions.length === 0) {
//       submissions.delete(ip);
//     } else {
//       submissions.set(ip, recentSubmissions);
//     }
//   }
// }, 60 * 60 * 1000);

// // Create SMTPS transporter (SSL/TLS from the start)
// function createSmtpsTransporter() {
//   console.log(`🔧 Setting up SMTPS transporter for ${EMAIL_USER} via ${EMAIL_HOST}:${EMAIL_PORT}`);
  
//   const actualPassword = EMAIL_PASS === '/* secret */' ? '0013@Village2025' : EMAIL_PASS;
//   if (EMAIL_PASS === '/* secret */') {
//     console.log('⚠️ Using fallback password because EMAIL_PASS contains placeholder value');
//   }
  
//   console.log(`🔑 Transporter will use password: "${actualPassword}" (from EMAIL_PASS: "${EMAIL_PASS}")`);
  
//   // Force fresh configuration object to avoid any reference issues
//   const smtpsConfig = {
//     host: String(EMAIL_HOST),
//     port: Number(EMAIL_PORT),
//     secure: true, // Force SSL/TLS from start for SMTPS
//     auth: {
//       user: String(EMAIL_USER),
//       pass: String(actualPassword) // Ensure it's a fresh string
//     },
//     tls: {
//       // SMTPS should work with standard TLS settings
//       rejectUnauthorized: process.env.NODE_ENV === 'production',
//       // Additional TLS options for better compatibility
//       ciphers: 'SSLv3',
//       secureProtocol: 'TLSv1_2_method'
//     },
//     logger: true,
//     debug: process.env.NODE_ENV === 'development',
//     connectionTimeout: 15000, // Increased for SSL handshake
//     greetingTimeout: 15000,
//     socketTimeout: 15000,
//     // Disable pool to avoid caching issues
//     pool: false,
//     maxConnections: 1,
//     maxMessages: 1
//   };

//   console.log(`📡 SMTPS Configuration: ${EMAIL_HOST}:${EMAIL_PORT} (secure: ${smtpsConfig.secure})`);
//   console.log(`🔐 Final auth config - user: "${smtpsConfig.auth.user}", pass: "${smtpsConfig.auth.pass}"`);
  
//   return nodemailer.createTransport(smtpsConfig);
// }

// // Create fallback transporter using SMTP with STARTTLS (port 587)
// function createFallbackTransporter() {
//   console.log(`🔄 Setting up fallback SMTP+STARTTLS transporter for ${EMAIL_USER}`);
  
//   const actualPassword = EMAIL_PASS === '/* secret */' ? '0013@Village2025' : EMAIL_PASS;
//   console.log(`🔑 Fallback transporter will use password: "${actualPassword}"`);
  
//   const fallbackConfig = {
//     host: String(EMAIL_HOST),
//     port: 587, // Standard STARTTLS port
//     secure: false, // Start unencrypted, then upgrade with STARTTLS
//     requireTLS: true, // Require TLS upgrade
//     auth: {
//       user: String(EMAIL_USER),
//       pass: String(actualPassword) // Ensure fresh string
//     },
//     tls: {
//       rejectUnauthorized: process.env.NODE_ENV === 'production',
//       // Force TLS version for compatibility
//       minVersion: 'TLSv1.2'
//     },
//     logger: true,
//     debug: process.env.NODE_ENV === 'development',
//     connectionTimeout: 15000,
//     greetingTimeout: 15000,
//     socketTimeout: 15000,
//     // Disable pool to avoid caching issues
//     pool: false,
//     maxConnections: 1,
//     maxMessages: 1
//   };

//   console.log(`🔐 Fallback final auth config - user: "${fallbackConfig.auth.user}", pass: "${fallbackConfig.auth.pass}"`);
  
//   return nodemailer.createTransport(fallbackConfig);
// }

// let smtpsTransporter = createSmtpsTransporter();
// let fallbackTransporter = null;

// // Force recreate transporter if we detect the correct password to ensure fresh credentials
// if (EMAIL_PASS === '0013@Village2025') {
//   console.log('🔄 Detected correct password - recreating transporter to ensure it uses the right credentials...');
//   smtpsTransporter = createSmtpsTransporter();
// }

// // Verify SMTPS configuration on startup with enhanced error reporting
// smtpsTransporter.verify((error, success) => {
//   if (error) {
//     console.error('❌ SMTPS configuration error:', error.message);
//     console.error('Error details:', {
//       code: error.code,
//       response: error.response,
//       responseCode: error.responseCode
//     });
    
//     // Provide specific troubleshooting based on error type
//     if (error.code === 'EAUTH') {
//       console.error('\n🔐 SMTPS Authentication Failed - Solutions:');
//       console.error('   1. ✅ Verify EMAIL_USER and EMAIL_PASS in your .env file');
//       console.error('   2. ✅ Ensure EMAIL_PASS is the actual password (not a placeholder)');
//       console.error('   3. ✅ Try logging into webmail with these exact credentials');
//       console.error('   4. ✅ Check if your email provider requires app-specific passwords');
//       console.error('   5. ✅ Verify SMTPS access is enabled for this email account');
//       console.error('   6. ✅ Contact your hosting provider to confirm SMTPS settings');
//       console.error(`\n   Current config: ${EMAIL_USER} → ${EMAIL_HOST}:${EMAIL_PORT} (SMTPS: ${EMAIL_SECURE})`);
//     } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
//       console.error('\n🌐 SMTPS Connection Failed - Check:');
//       console.error(`   1. EMAIL_HOST (${EMAIL_HOST}) and EMAIL_PORT (${EMAIL_PORT}) are correct for SMTPS`);
//       console.error('   2. Port 465 is open and not blocked by firewall');
//       console.error('   3. Server supports SMTPS (SSL/TLS from start)');
//       console.error('   4. DNS resolution is working for the email host');
//       console.error('   5. Server SSL certificate is valid');
//     } else if (error.code === 'ESOCKET' || error.code === 'CERT_HAS_EXPIRED') {
//       console.error('\n🔌 SMTPS SSL/TLS Error - Try:');
//       console.error('   1. Check if server SSL certificate is valid and not expired');
//       console.error('   2. Verify SMTPS is properly configured on mail server');
//       console.error('   3. Try fallback SMTP+STARTTLS configuration');
//       console.error('   4. Contact hosting provider about SSL certificate issues');
//     }
    
//     // Try to set up fallback transporter
//     console.log('\n🔄 Attempting to set up SMTP+STARTTLS fallback configuration...');
//     fallbackTransporter = createFallbackTransporter();
    
//     fallbackTransporter.verify((fallbackError, fallbackSuccess) => {
//       if (fallbackError) {
//         console.error('❌ Fallback SMTP+STARTTLS configuration also failed:', fallbackError.message);
//         console.error('\n⚠️ Email functionality will be limited. Please fix SMTPS configuration before production.');
//       } else {
//         console.log('✅ Fallback SMTP+STARTTLS configuration successful - will use port 587');
//       }
//     });
    
//   } else {
//     console.log(`✅ SMTPS server for ${EMAIL_USER} is ready to send messages securely`);
//   }
// });

// // Enhanced input validation function
// function validateInput(name, email, phone, subject, message) {
//   const errors = [];
  
//   // Name validation
//   if (!name || typeof name !== 'string') {
//     errors.push('Name is required');
//   } else {
//     const trimmedName = name.trim();
//     if (trimmedName.length < 2) {
//       errors.push('Name must be at least 2 characters long');
//     } else if (trimmedName.length > 100) {
//       errors.push('Name must be less than 100 characters');
//     } else if (!/^[a-zA-Z\s\-'\.]+$/.test(trimmedName)) {
//       errors.push('Name contains invalid characters');
//     }
//   }
  
//   // Email validation
//   const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
//   if (!email || typeof email !== 'string') {
//     errors.push('Email is required');
//   } else {
//     const trimmedEmail = email.trim();
//     if (!emailRegex.test(trimmedEmail)) {
//       errors.push('Please provide a valid email address');
//     } else if (trimmedEmail.length > 254) {
//       errors.push('Email address is too long');
//     }
//   }
  
//   // Phone validation (optional but if provided, should be valid)
//   if (phone && typeof phone === 'string' && phone.trim().length > 0) {
//     const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,20}$/;
//     const trimmedPhone = phone.trim();
//     if (!phoneRegex.test(trimmedPhone)) {
//       errors.push('Please provide a valid phone number');
//     }
//   }
  
//   // Subject validation (optional)
//   if (subject && typeof subject === 'string') {
//     const trimmedSubject = subject.trim();
//     if (trimmedSubject.length > 200) {
//       errors.push('Subject must be less than 200 characters');
//     }
//   }
  
//   // Message validation
//   if (!message || typeof message !== 'string') {
//     errors.push('Message is required');
//   } else {
//     const trimmedMessage = message.trim();
//     if (trimmedMessage.length < 10) {
//       errors.push('Message must be at least 10 characters long');
//     } else if (trimmedMessage.length > 5000) {
//       errors.push('Message must be less than 5000 characters');
//     }
//   }
  
//   return errors;
// }

// // Rate limiting function
// function checkRateLimit(clientIP) {
//   const now = Date.now();
//   const fifteenMinutesAgo = now - 15 * 60 * 1000;
  
//   if (!submissions.has(clientIP)) {
//     submissions.set(clientIP, []);
//   }
  
//   const userSubmissions = submissions.get(clientIP);
//   const recentSubmissions = userSubmissions.filter(time => time > fifteenMinutesAgo);
  
//   if (recentSubmissions.length >= 5) {
//     return false; // Rate limit exceeded
//   }
  
//   recentSubmissions.push(now);
//   submissions.set(clientIP, recentSubmissions);
//   return true;
// }

// // Sanitize HTML content to prevent XSS
// function sanitizeHtml(text) {
//   if (!text) return '';
//   return text
//     .replace(/&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;')
//     .replace(/"/g, '&quot;')
//     .replace(/'/g, '&#39;')
//     .replace(/\n/g, '<br>');
// }

// // Enhanced email sending function with SMTPS and fallback
// async function sendEmailWithFallback(mailOptions) {
//   let lastError = null;
  
//   // Try SMTPS transporter first
//   try {
//     console.log('📧 Attempting to send email with SMTPS...');
//     const result = await smtpsTransporter.sendMail(mailOptions);
//     console.log('✅ Email sent successfully with SMTPS (SSL/TLS)');
//     return result;
//   } catch (error) {
//     console.warn('⚠️ SMTPS configuration failed:', error.message);
//     lastError = error;
    
//     // Try fallback transporter if available
//     if (fallbackTransporter) {
//       try {
//         console.log('📧 Attempting to send email with SMTP+STARTTLS fallback...');
//         const result = await fallbackTransporter.sendMail(mailOptions);
//         console.log('✅ Email sent successfully with SMTP+STARTTLS fallback');
//         return result;
//       } catch (fallbackError) {
//         console.error('❌ SMTP+STARTTLS fallback also failed:', fallbackError.message);
//         lastError = fallbackError;
//       }
//     }
    
//     // If both failed, throw the last error
//     throw lastError;
//   }
// }

// // Main POST handler
// export async function POST({ request, getClientAddress }) {
//   try {
//     // Get client IP for rate limiting
//     const clientIP = getClientAddress();
//     console.log(`📬 New contact form submission from IP: ${clientIP}`);
    
//     // Check rate limit
//     if (!checkRateLimit(clientIP)) {
//       console.warn(`🚫 Rate limit exceeded for IP: ${clientIP}`);
//       return json({
//         success: false,
//         message: 'Too many submissions. Please try again in 15 minutes.'
//       }, { status: 429 });
//     }

//     // Parse request body with error handling
//     let requestBody;
//     try {
//       requestBody = await request.json();
//     } catch (parseError) {
//       console.error('❌ JSON parsing error:', parseError.message);
//       return json({
//         success: false,
//         message: 'Invalid request format. Please check your data and try again.'
//       }, { status: 400 });
//     }

//     const { name, email, phone, subject, message } = requestBody;
//     console.log(`📝 Contact form data received from: ${email}`);
    
//     // Validate input
//     const validationErrors = validateInput(name, email, phone, subject, message);
//     if (validationErrors.length > 0) {
//       console.warn('❌ Validation failed:', validationErrors);
//       return json({
//         success: false,
//         message: 'Validation failed',
//         errors: validationErrors
//       }, { status: 400 });
//     }

//     // Sanitize input
//     const sanitizedName = name.trim();
//     const sanitizedEmail = email.trim().toLowerCase();
//     const sanitizedPhone = phone ? phone.trim() : '';
//     const sanitizedSubject = subject ? subject.trim() : 'New Contact Form Submission';
//     const sanitizedMessage = message.trim();

//     console.log(`✅ Input validated and sanitized for: ${sanitizedName} <${sanitizedEmail}>`);

//     // Email to business owner (sent via SMTPS)
//     const mailOptionsToOwner = {
//       to: OWNER_EMAIL, 
//       from: `"${sanitizedName}" <${EMAIL_USER}>`, // From your authenticated email
//       replyTo: sanitizedEmail, // Allow direct reply to customer
//       subject: `Contact Form: ${sanitizedSubject}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd;">
//           <div style="background-color: #21409a; padding: 20px; text-align: center;">
//             <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
//           </div>
//           <div style="padding: 20px; background-color: #f9f9f9;">
//             <h2 style="color: #21409a; margin-top: 0;">Contact Details</h2>
//             <table style="width: 100%; border-collapse: collapse;">
//               <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td style="padding: 8px 0;">${sanitizeHtml(sanitizedName)}</td></tr>
//               <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${sanitizedEmail}">${sanitizeHtml(sanitizedEmail)}</a></td></tr>
//               ${sanitizedPhone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${sanitizedPhone}">${sanitizeHtml(sanitizedPhone)}</a></td></tr>` : ''}
//               ${sanitizedSubject !== 'New Contact Form Submission' ? `<tr><td style="padding: 8px 0; font-weight: bold;">Subject:</td><td style="padding: 8px 0;">${sanitizeHtml(sanitizedSubject)}</td></tr>` : ''}
//               <tr><td style="padding: 8px 0; font-weight: bold;">IP Address:</td><td style="padding: 8px 0;">${clientIP}</td></tr>
//               <tr><td style="padding: 8px 0; font-weight: bold;">Submitted:</td><td style="padding: 8px 0;">${new Date().toLocaleString()}</td></tr>
//             </table>
            
//             <h2 style="color: #21409a; margin-top: 30px;">Message</h2>
//             <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #E1B12C; line-height: 1.6;">
//               ${sanitizeHtml(sanitizedMessage)}
//             </div>
            
//             <div style="margin-top: 20px; padding: 15px; background-color: #e8f4fd; border-radius: 5px;">
//               <p style="margin: 0; font-size: 14px; color: #21409a;">
//                 <strong>Quick Actions:</strong><br>
//                 Reply directly to this email to respond to ${sanitizedName}<br>
//                 Email: <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a>
//                 ${sanitizedPhone ? `<br>Call: <a href="tel:${sanitizedPhone}">${sanitizedPhone}</a>` : ''}
//               </p>
//             </div>
//           </div>
//           <div style="background-color: #21409a; padding: 15px; text-align: center;">
//             <p style="color: white; margin: 0; font-size: 12px;">
//               This email was sent from your Village Tech contact form via SMTPS<br>
//               Received on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
//             </p>
//           </div>
//         </div>
//       `,
//       text: `
// New Contact Form Submission - Village Tech

// Contact Details:
// ================
// Name: ${sanitizedName}
// Email: ${sanitizedEmail}
// ${sanitizedPhone ? `Phone: ${sanitizedPhone}` : ''}
// ${sanitizedSubject !== 'New Contact Form Submission' ? `Subject: ${sanitizedSubject}` : ''}
// IP Address: ${clientIP}
// Submitted: ${new Date().toLocaleString()}

// Message:
// ========
// ${sanitizedMessage}

// ---
// This email was sent from your Village Tech contact form via SMTPS
// Reply directly to this email to respond to the customer.
//       `
//     };

//     // Auto-reply email to user (sent via SMTPS)
//     const mailOptionsToUser = {
//       to: sanitizedEmail,
//       from: `"Village Tech" <${EMAIL_USER}>`, // Your sending email address
//       subject: "Thank you for contacting Village Tech - We'll be in touch soon!",
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd;">
//           <div style="background-color: #21409a; padding: 20px; text-align: center;">
//             <h1 style="color: white; margin: 0; font-size: 24px;">Thank You!</h1>
//           </div>
//           <div style="padding: 20px;">
//             <p style="font-size: 16px;">Dear ${sanitizeHtml(sanitizedName)},</p>
            
//             <p style="line-height: 1.6;">Thank you for your interest in Village Tech Training Solutions. We have received your message and appreciate you taking the time to contact us.</p>
            
//             <div style="background-color: #f0f8ff; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #21409a;">
//               <h3 style="color: #21409a; margin-top: 0; font-size: 18px;">What happens next?</h3>
//               <ul style="margin: 10px 0; padding-left: 20px; line-height: 1.6;">
//                 <li>Our team will review your message within 2-4 business hours</li>
//                 <li>You'll receive a personalized response within 24-48 hours</li>
//                 <li>If urgent, feel free to call us directly</li>
//               </ul>
//             </div>
            
//             <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
//               <h3 style="color: #21409a; margin-top: 0;">Your Message Summary:</h3>
//               <p><strong>Subject:</strong> ${sanitizeHtml(sanitizedSubject)}</p>
//               <p style="font-style: italic; background-color: white; padding: 10px; border-radius: 3px; line-height: 1.6;">
//                 ${sanitizeHtml(sanitizedMessage)}
//               </p>
//             </div>
            
//             <div style="background-color: #21409a; color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
//               <h3 style="margin-top: 0; color: white;">Visit Us</h3>
//               <p style="margin: 5px 0;"><strong>Address:</strong> Village Tech Training Solutions</p>
//               <p style="margin: 5px 0;">85 Main St, Ground Floor</p>
//               <p style="margin: 5px 0;">Johannesburg, 2107, South Africa</p>
//               <p style="margin: 5px 0;"><strong>Email:</strong> info@villagetech.co.za</p>
//               <p style="margin: 5px 0;"><strong>Website:</strong> villagetech.co.za</p>
//             </div>
            
//             <p style="margin-top: 30px;">Best regards,<br>
//             <strong style="color: #E1B12C; font-size: 18px;">The Village Tech Team</strong></p>
//           </div>
//           <div style="background-color: #f5f5f5; padding: 15px; text-align: center; border-top: 1px solid #ddd;">
//             <p style="color: #666; margin: 0; font-size: 12px;">
//               This is an automated response sent securely via SMTPS. Please do not reply to this email.<br>
//               If you need immediate assistance, please contact us directly.<br>
//               Message sent on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
//             </p>
//           </div>
//         </div>
//       `,
//       text: `
// Dear ${sanitizedName},

// Thank you for your interest in Village Tech Training Solutions. We have received your message and appreciate you taking the time to contact us.

// What happens next?
// ==================
// - Our team will review your message within 2-4 business hours
// - You'll receive a personalized response within 24-48 hours  
// - If urgent, feel free to call us directly

// Your Message Summary:
// ====================
// ${sanitizedSubject !== 'New Contact Form Submission' ? `Subject: ${sanitizedSubject}` : ''}
// ${sanitizedMessage}

// Visit Us:
// =========
// Village Tech Training Solutions
// 85 Main St, Ground Floor
// Johannesburg, 2107, South Africa
// Email: info@villagetech.co.za
// Website: villagetech.co.za

// Best regards,
// The Village Tech Team

// ---
// This is an automated response sent securely via SMTPS. Please do not reply to this email.
// If you need immediate assistance, please contact us directly.
// Message sent on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
//       `
//     };

//     // Send both emails with comprehensive error handling and fallback
//     try {
//       console.log('📤 Sending owner notification email via SMTPS...');
//       console.log('📤 Sending user auto-reply email via SMTPS...');
      
//       const results = await Promise.allSettled([
//         sendEmailWithFallback(mailOptionsToOwner),
//         sendEmailWithFallback(mailOptionsToUser)
//       ]);

//       const ownerEmailResult = results[0];
//       const userEmailResult = results[1];

//       // Check if owner email was sent successfully
//       if (ownerEmailResult.status === 'rejected') {
//         console.error('❌ Failed to send owner notification:', ownerEmailResult.reason?.message);
//         throw new Error('Failed to send notification to business owner');
//       }

//       // Log results for user email
//       if (userEmailResult.status === 'fulfilled') {
//         console.log(`✅ Contact form submission from ${sanitizedEmail} processed successfully - both emails sent via SMTPS`);
//       } else {
//         console.warn(`⚠️ Owner notification sent, but auto-reply to user failed for ${sanitizedEmail}:`, userEmailResult.reason?.message);
//       }
      
//       return json({
//         success: true,
//         message: 'Your message has been sent successfully! We will get back to you soon.'
//       });

//     } catch (emailError) {
//       console.error('❌ Critical email sending error:', emailError.message);
//       console.error('Error details:', {
//         code: emailError.code,
//         response: emailError.response,
//         command: emailError.command
//       });
      
//       // Return error response with helpful information
//       return json({
//         success: false,
//         message: 'There was an error sending your message. Please try again later or contact us directly at info@villagetech.co.za.'
//       }, { status: 500 });
//     }

//   } catch (error) {
//     console.error('❌ Unexpected error in contact form handler:', error.message);
//     console.error('Stack trace:', error.stack);
//     return json({
//       success: false,
//       message: 'An unexpected error occurred. Please try again later.'
//     }, { status: 500 });
//   }
// }

// // GET handler for health checks with enhanced diagnostics
// export async function GET() {
//   // Test email configuration
//   let emailStatus = 'unknown';
//   let connectionTest = null;
  
//   try {
//     await smtpsTransporter.verify();
//     emailStatus = 'smtps_connected';
//     connectionTest = { smtps: true, fallback: null };
//   } catch (primaryError) {
//     if (fallbackTransporter) {
//       try {
//         await fallbackTransporter.verify();
//         emailStatus = 'fallback_connected';
//         connectionTest = { smtps: false, fallback: true };
//       } catch (fallbackError) {
//         emailStatus = 'all_failed';
//         connectionTest = { smtps: false, fallback: false };
//       }
//     } else {
//       emailStatus = 'smtps_failed_no_fallback';
//       connectionTest = { smtps: false, fallback: null };
//     }
//   }

//   return json({
//     status: 'Contact form API is running with SMTPS',
//     timestamp: new Date().toISOString(),
//     emailStatus,
//     connectionTest,
//     rateLimit: {
//       activeIps: submissions.size,
//       cleanupInterval: '1 hour'
//     },
//     emailConfig: {
//       provider: 'SMTPS (SMTP over SSL/TLS)',
//       host: EMAIL_HOST,
//       port: EMAIL_PORT,
//       secure: EMAIL_SECURE,
//       protocol: EMAIL_PORT === 465 && EMAIL_SECURE ? 'SMTPS' : 'SMTP+STARTTLS',
//       authType: 'User/Pass',
//       fromAddress: EMAIL_USER,
//       toOwnerAddress: OWNER_EMAIL,
//       fallbackAvailable: !!fallbackTransporter
//     },
//     environment: {
//       nodeEnv: process.env.NODE_ENV,
//       configValidation: validateEmailConfig()
//     }
//   });
// }