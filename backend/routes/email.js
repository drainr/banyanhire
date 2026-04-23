const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const {
  sendEmail,
  recruiterApprovedEmail,
  recruiterRejectedEmail,
  applicationReviewedEmail,
  applicationRejectedEmail,
} = require('../config/email');
const { protect } = require('../middleware/authMiddleware');

// Send recruiter approval email
router.post('/recruiter-approved', async (req, res) => {
  try {
    const { recruiterEmail, recruiterName } = req.body;

    if (!recruiterEmail || !recruiterName) {
      return res.status(400).json({
        success: false,
        message: 'Recruiter email and name are required',
      });
    }

    const emailTemplate = recruiterApprovedEmail(recruiterName);
    await sendEmail({
      to: recruiterEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    });

    res.status(200).json({
      success: true,
      message: 'Approval email sent',
    });
  } catch (error) {
    console.error('Error sending approval email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send approval email',
      error: error.message,
    });
  }
});

// Send recruiter rejection email
router.post('/recruiter-rejected', async (req, res) => {
  try {
    const { recruiterEmail, recruiterName } = req.body;

    if (!recruiterEmail || !recruiterName) {
      return res.status(400).json({
        success: false,
        message: 'Recruiter email and name are required',
      });
    }

    const emailTemplate = recruiterRejectedEmail(recruiterName);
    await sendEmail({
      to: recruiterEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    });

    res.status(200).json({
      success: true,
      message: 'Rejection email sent',
    });
  } catch (error) {
    console.error('Error sending rejection email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send rejection email',
      error: error.message,
    });
  }
});

// Send application reviewed/approved email
router.post('/application-reviewed', protect, async (req, res) => {
  try {
    const { applicantEmail, applicantName, jobTitle, status } = req.body;

    if (!applicantEmail || !applicantName || !jobTitle || !status) {
      return res.status(400).json({
        success: false,
        message: 'Applicant email, name, job title, and status are required',
      });
    }

    const emailTemplate = applicationReviewedEmail(applicantName, jobTitle, status);
    await sendEmail({
      to: applicantEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    });

    res.status(200).json({
      success: true,
      message: 'Application status email sent',
    });
  } catch (error) {
    console.error('Error sending application status email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send application status email',
      error: error.message,
    });
  }
});

// Send application rejected email
router.post('/application-rejected', protect, async (req, res) => {
  try {
    const { applicantEmail, applicantName, jobTitle } = req.body;

    if (!applicantEmail || !applicantName || !jobTitle) {
      return res.status(400).json({
        success: false,
        message: 'Applicant email, name, and job title are required',
      });
    }

    const emailTemplate = applicationRejectedEmail(applicantName, jobTitle);
    await sendEmail({
      to: applicantEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    });

    res.status(200).json({
      success: true,
      message: 'Rejection email sent',
    });
  } catch (error) {
    console.error('Error sending rejection email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send rejection email',
      error: error.message,
    });
  }
});

// Send seeker message to recruiter (uses app sender, seeker as reply-to)
router.post('/seeker-to-recruiter', protect, async (req, res) => {
  try {
    const { recruiterEmail, jobId, message } = req.body;

    if (req.user.role !== 'seeker') {
      return res.status(403).json({
        success: false,
        message: 'Only seekers can send this message',
      });
    }

    if (!recruiterEmail || !jobId || !message) {
      return res.status(400).json({
        success: false,
        message: 'Recruiter email, job ID, and message are required',
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    const subject = `Seeker message about ${job.title}`;

    const seekerName = req.user.name || 'A job seeker';
    const seekerEmail = req.user.email;

    const html = `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <h2 style="border-bottom:2px solid #1a1a1a;padding-bottom:8px">BanyanHire</h2>
        <p>You received a new message from a seeker.</p>
        <p><strong>From:</strong> ${seekerName} (${seekerEmail})</p>
        <p><strong>Job:</strong> ${job.title}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p style="white-space:pre-wrap;line-height:1.5">${message}</p>
        <p style="margin-top:24px;font-size:12px;color:#666">Reply directly to this email to contact the seeker.</p>
      </div>
    `;

    const text = `New message from seeker\n\nFrom: ${seekerName} (${seekerEmail})\nJob: ${job.title}\nSubject: ${subject}\n\n${message}\n\nReply to this email to contact the seeker.`;

    await sendEmail({
      to: recruiterEmail,
      subject,
      html,
      text,
      replyTo: seekerEmail,
    });

    res.status(200).json({
      success: true,
      message: 'Message sent to recruiter',
    });
  } catch (error) {
    console.error('Error sending seeker-to-recruiter email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message to recruiter',
      error: error.message,
    });
  }
});

module.exports = router;
