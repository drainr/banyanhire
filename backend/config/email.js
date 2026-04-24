const nodemailer = require('nodemailer');

// Creates a transporter from env vars.
// Required in .env:
//   EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS
// Optional:
//   EMAIL_FROM  (defaults to EMAIL_USER)
//   EMAIL_PREVIEW (set to "true" to log emails to console instead of sending)
function createTransporter() {
  if (process.env.EMAIL_PREVIEW === 'true') return null;
  
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) return null;
  
  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: parseInt(EMAIL_PORT, 10) || 587,
    secure: parseInt(EMAIL_PORT, 10) === 465,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });
}

/**
 * Send a plain + HTML email.
 * @param {{ to: string, subject: string, html: string, text?: string, replyTo?: string }} opts
 * @returns {Promise<void>} — resolves silently even if email is not configured
 */
async function sendEmail({ to, subject, html, text, replyTo }) {
  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'no-reply@banyanhire.edu';
  
  // Preview mode: log to console instead of sending
  if (process.env.EMAIL_PREVIEW === 'true') {
    console.log('\n📧 EMAIL PREVIEW');
    console.log(`  To:      ${to}`);
    console.log(`  Subject: ${subject}`);
    console.log(`  Body:    ${text || '(html only)'}\n`);
    return;
  }
  
  const transporter = createTransporter();
  if (!transporter) {
    console.warn(`[email] Not configured — skipped email to ${to}: "${subject}"`);
    return;
  }
  
  try {
    await transporter.sendMail({ from, to, subject, html, text, replyTo });
  } catch (err) {
    // Never crash the request over a failed email
    console.error(`[email] Failed to send to ${to}:`, err.message);
  }
}

// ── Email Templates ────────────────────────────────────────────────────────

function recruiterApprovedEmail(name) {
  return {
    subject: 'Your BanyanHire recruiter account has been approved',
    text: `Hi ${name},\n\nYour recruiter account on BanyanHire has been approved. You can now log in and post job listings.\n\nWelcome aboard!\n\nThe BanyanHire Team`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <h2 style="border-bottom:2px solid #1a1a1a;padding-bottom:8px">BanyanHire</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Your recruiter account has been <strong>approved</strong>. You can now log in and post job listings on BanyanHire.</p>
        <p style="margin-top:32px">
          <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/login"
             style="background:#1a1a1a;color:#fff;padding:12px 24px;text-decoration:none;font-size:13px;text-transform:uppercase;letter-spacing:0.1em">
            Log In Now
          </a>
        </p>
        <p style="margin-top:40px;font-size:12px;color:#666">The BanyanHire Team</p>
      </div>
    `,
  };
}

function recruiterRejectedEmail(name) {
  return {
    subject: 'Update on your BanyanHire recruiter application',
    text: `Hi ${name},\n\nAfter review, your recruiter application on BanyanHire has not been approved at this time.\n\nIf you believe this is an error, please contact us.\n\nThe BanyanHire Team`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <h2 style="border-bottom:2px solid #1a1a1a;padding-bottom:8px">BanyanHire</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>After review, your recruiter application has <strong>not been approved</strong> at this time.</p>
        <p>If you believe this is an error or have questions, please reply to this email.</p>
        <p style="margin-top:40px;font-size:12px;color:#666">The BanyanHire Team</p>
      </div>
    `,
  };
}

function applicationReviewedEmail(applicantName, jobTitle, status) {
  const statusText = status === 'approved' ? 'approved' : 'under review';
  const statusColor = status === 'approved' ? '#2ecc71' : '#f39c12';
  
  return {
    subject: `Update on your application for ${jobTitle}`,
    text: `Hi ${applicantName},\n\nYour application for ${jobTitle} is now ${statusText}.\n\nWe'll be in touch soon with more updates.\n\nThe BanyanHire Team`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <h2 style="border-bottom:2px solid #1a1a1a;padding-bottom:8px">BanyanHire</h2>
        <p>Hi <strong>${applicantName}</strong>,</p>
        <p>Your application for <strong>${jobTitle}</strong> is now <span style="color:${statusColor};font-weight:bold">${statusText}</span>.</p>
        <p>We'll be in touch soon with more updates.</p>
        <p style="margin-top:40px;font-size:12px;color:#666">The BanyanHire Team</p>
      </div>
    `,
  };
}

function applicationRejectedEmail(applicantName, jobTitle) {
  return {
    subject: `Update on your application for ${jobTitle}`,
    text: `Hi ${applicantName},\n\nThank you for your application to ${jobTitle}. While we were impressed, we have decided to move forward with other candidates at this time.\n\nWe encourage you to apply for future positions.\n\nThe BanyanHire Team`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <h2 style="border-bottom:2px solid #1a1a1a;padding-bottom:8px">BanyanHire</h2>
        <p>Hi <strong>${applicantName}</strong>,</p>
        <p>Thank you for your application to <strong>${jobTitle}</strong>. While we were impressed, we have decided to move forward with other candidates at this time.</p>
        <p>We encourage you to apply for future positions on BanyanHire.</p>
        <p style="margin-top:40px;font-size:12px;color:#666">The BanyanHire Team</p>
      </div>
    `,
  };
}

function applicationSubmittedEmail(applicantName, jobTitle, companyName) {
  return {
    subject: `Your application for ${jobTitle} at ${companyName} has been received`,
    text: `Hi ${applicantName},\n\nThank you for your application to ${jobTitle} at ${companyName}. We have received your application and will review it shortly.\n\nThe BanyanHire Team`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <h2 style="border-bottom:2px solid #1a1a1a;padding-bottom:8px">BanyanHire</h2>
        <p>Hi <strong>${applicantName}</strong>,</p>
        <p>Thank you for your application to <strong>${jobTitle}</strong> at <strong>${companyName}</strong>. We have received your application and will review it shortly.</p>
        <p style="margin-top:40px;font-size:12px;color:#666">The BanyanHire Team</p>
      </div>
    `,
  };
}

function accountDisabledEmail(accountName, reason) {
  return {
    subject: "Your BanyanHire account has been disabled",
    text: `Hi ${accountName},\n\nYour BanyanHire account has been disabled for the following reason: ${reason}\n\nIf you have any questions or believe this is an error, please contact our support team.\n\nThe BanyanHire Team`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <h2 style="border-bottom:2px solid #1a1a1a;padding-bottom:8px">BanyanHire</h2>
        <p>Hi <strong>${accountName}</strong>,</p>
        <p>Your BanyanHire account has been disabled for the following reason: <strong>${reason}</strong>.</p>
        <p>If you have any questions or believe this is an error, please contact our support team.</p>
        <p style="margin-top:40px;font-size:12px;color:#666">The BanyanHire Team</p>
      </div>
    `,
  };
}

function jobListingDisabledEmail(recruiterName, jobTitle, reason) {
  return {
    subject: `Your job listing "${jobTitle}" has been disabled`,
    text: `Hi ${recruiterName},\n\nYour job listing "${jobTitle}" has been disabled for the following reason: ${reason}\n\nIf you have any questions or believe this is an error, please contact our support team.\n\nThe BanyanHire Team`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <h2 style="border-bottom:2px solid #1a1a1a;padding-bottom:8px">BanyanHire</h2>
        <p>Hi <strong>${recruiterName}</strong>,</p>
        <p>Your job listing "<strong>${jobTitle}</strong>" has been disabled for the following reason: <strong>${reason}</strong>.</p>
        <p>If you have any questions or believe this is an error, please contact our support team.</p>
        <p style="margin-top:40px;font-size:12px;color:#666">The BanyanHire Team</p>
      </div>
    `,
  };
}


module.exports = {
  sendEmail,
  recruiterApprovedEmail,
  recruiterRejectedEmail,
  applicationReviewedEmail,
  applicationRejectedEmail,
  applicationSubmittedEmail,
  accountDisabledEmail,
  jobListingDisabledEmail,
};
