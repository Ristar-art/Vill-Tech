// test-email.js - Run this script to test your email configuration
import nodemailer from 'nodemailer';

const config = {
  EMAIL_USER: 'info@lekgotlainvestment.co.za',
  EMAIL_PASS: 'your-actual-password', // Replace with your actual password
  EMAIL_HOST: 'mail.lekgotlainvestment.co.za',
  EMAIL_PORT: 587,
  EMAIL_SECURE: false
};

const transporter = nodemailer.createTransporter({
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  secure: config.EMAIL_SECURE,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  logger: true,
  debug: true
});

// Test the connection
async function testConnection() {
  try {
    console.log('Testing email configuration...');
    await transporter.verify();
    console.log('✅ Email configuration is working!');
    
    // Send a test email
    const info = await transporter.sendMail({
      from: config.EMAIL_USER,
      to: config.EMAIL_USER, // Send to yourself
      subject: 'Test Email from Lekgotla Investment Club',
      text: 'This is a test email to verify the configuration is working.',
      html: '<p>This is a test email to verify the configuration is working.</p>'
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    
  } catch (error) {
    console.error('❌ Email configuration failed:');
    console.error(error.message);
    
    // Try alternative configurations
    console.log('\n🔧 Trying alternative configurations...');
    
    const alternatives = [
      { host: 'lekgotlainvestment.co.za', port: 587, secure: false },
      { host: 'mail.lekgotlainvestment.co.za', port: 465, secure: true },
      { host: 'jabu.onerserv.co.za', port: 587, secure: false }
    ];
    
    for (const alt of alternatives) {
      console.log(`\nTrying ${alt.host}:${alt.port} (secure: ${alt.secure})`);
      
      const altTransporter = nodemailer.createTransporter({
        host: alt.host,
        port: alt.port,
        secure: alt.secure,
        auth: {
          user: config.EMAIL_USER,
          pass: config.EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      
      try {
        await altTransporter.verify();
        console.log(`✅ SUCCESS with ${alt.host}:${alt.port}`);
        console.log('Use this configuration in your .env file:');
        console.log(`EMAIL_HOST=${alt.host}`);
        console.log(`EMAIL_PORT=${alt.port}`);
        console.log(`EMAIL_SECURE=${alt.secure}`);
        break;
      } catch (altError) {
        console.log(`❌ Failed with ${alt.host}:${alt.port}`);
      }
    }
  }
}

testConnection();