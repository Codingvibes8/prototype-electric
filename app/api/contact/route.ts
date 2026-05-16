import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    const {
      firstName,
      title,
      company,
      email,
      reason,
      areaOfInterest,
      subject,
      message,
      budgetRange,
      timeline
    } = body;

    // Validate required fields
    if (!firstName?.trim() || !email?.trim() || !reason || !areaOfInterest || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Format the reason and area of interest for better readability
    const reasonLabels: Record<string, string> = {
      quote: 'Request a Quote',
      support: 'Support',
      other: 'Other'
    };

    const areaLabels: Record<string, string> = {
      residential: 'Residential',
      commercial: 'Commercial',
      industrial: 'Industrial'
    };

    const budgetLabels: Record<string, string> = {
      'under-500': 'Under £500',
      '500-1000': '£500 - £1,000',
      '1000-2000': '£1,000 - £2,000',
      '2000-5000': '£2,000 - £5,000',
      '5000-plus': '£5,000+',
      'unsure': 'Not sure yet'
    };

    const timelineLabels: Record<string, string> = {
      'urgent': 'Urgent (within 1 week)',
      '1-2-weeks': '1-2 weeks',
      '1-month': 'Within 1 month',
      '1-3-months': '1-3 months',
      '3-plus-months': '3+ months',
      'planning': 'Just planning'
    };

    // Send email to business owner
    const businessEmail = await resend.emails.send({
      from: 'Electric Jamez Contact <contact@electricjamez.co.uk>',
      to: 'info@electricjamez.co.uk',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${firstName}</td>
          </tr>
          ${title ? `<tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Title:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${title}</td>
          </tr>` : ''}
          ${company ? `<tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Company:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${company}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Reason for Contact:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${reasonLabels[reason] || reason}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Area of Interest:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${areaLabels[areaOfInterest] || areaOfInterest}</td>
          </tr>
          ${budgetRange ? `<tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Budget Range:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${budgetLabels[budgetRange] || budgetRange}</td>
          </tr>` : ''}
          ${timeline ? `<tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Project Timeline:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${timelineLabels[timeline] || timeline}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Subject:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${subject}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Message:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${message.replace(/\n/g, '<br>')}</td>
          </tr>
        </table>
      `,
    });

    // Send confirmation email to client
    const clientEmail = await resend.emails.send({
      from: 'Electric Jamez <info@electricjamez.co.uk>',
      to: email,
      subject: 'Thank you for contacting Electric Jamez',
      html: `
        <h2>Thank you for your inquiry, ${firstName}!</h2>
        <p>We've received your message and will get back to you within 24 hours.</p>
        <p><strong>Your submitted information:</strong></p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Subject:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${subject}</td>
          </tr>
          ${budgetRange ? `<tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Budget Range:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${budgetLabels[budgetRange] || budgetRange}</td>
          </tr>` : ''}
          ${timeline ? `<tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Project Timeline:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${timelineLabels[timeline] || timeline}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Message:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${message.replace(/\n/g, '<br>')}</td>
          </tr>
        </table>
        <p>Best regards,<br/>The Electric Jamez Team</p>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Emails sent successfully'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      {
        error: 'Failed to send emails',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}