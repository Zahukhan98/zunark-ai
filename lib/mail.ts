import nodemailer from "nodemailer";

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendInquiryNotification(data: {
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  country?: string | null;
  industry?: string | null;
  projectType: string;
  budget?: string | null;
  timeline?: string | null;
  description: string;
  additionalRequirements?: string | null;
}) {
  const transport = getTransport();
  if (!transport) {
    console.warn("SMTP not configured — skipping inquiry notification email.");
    return;
  }

  const to = process.env.INQUIRY_NOTIFICATION_EMAIL || "info@zunark-ai.com";
  const from = process.env.SMTP_USER;

  const rows: [string, string | null | undefined][] = [
    ["Name", data.name],
    ["Company", data.company],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Country", data.country],
    ["Industry", data.industry],
    ["Looking to build", data.projectType],
    ["Budget", data.budget],
    ["Timeline", data.timeline],
  ];

  const html = `
    <h2>New project enquiry</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      ${rows
        .filter(([, v]) => v)
        .map(([label, v]) => `<tr><td style="color:#666;padding-right:16px;"><b>${label}</b></td><td>${escapeHtml(String(v))}</td></tr>`)
        .join("")}
    </table>
    <h3>Description</h3>
    <p style="white-space:pre-wrap;font-family:sans-serif;font-size:14px;">${escapeHtml(data.description)}</p>
    ${
      data.additionalRequirements
        ? `<h3>Additional requirements</h3><p style="white-space:pre-wrap;font-family:sans-serif;font-size:14px;">${escapeHtml(data.additionalRequirements)}</p>`
        : ""
    }
  `;

  try {
    await transport.sendMail({
      from: `"ZUNARK Website" <${from}>`,
      to,
      replyTo: data.email,
      subject: `New project enquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
      html,
    });
  } catch (err) {
    // Never let a notification failure block the actual inquiry from being saved.
    console.error("Failed to send inquiry notification email:", err);
  }
}

export async function sendInquiryConfirmation(data: { name: string; email: string }) {
  const transport = getTransport();
  if (!transport) {
    console.warn("SMTP not configured — skipping inquiry confirmation email.");
    return;
  }

  const from = process.env.SMTP_USER;
  const firstName = data.name.trim().split(/\s+/)[0] || data.name;

  const html = `
    <div style="font-family:sans-serif;font-size:15px;color:#222;line-height:1.6;">
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Thank you for reaching out to ZUNARK. We've received your project enquiry and it's currently under review by our team — we'll get back to you shortly.</p>
      <p>In the meantime, feel free to take a look at our <a href="https://www.zunark-ai.com/work">work</a> and <a href="https://www.zunark-ai.com/services">services</a>.</p>
      <p>Best regards,<br>The ZUNARK Team</p>
      <p style="margin-top:24px;color:#888;font-size:12px;">This is an automated confirmation — there's no need to reply to this email. If you have anything to add, you can reach us at info@zunark-ai.com.</p>
    </div>
  `;

  try {
    await transport.sendMail({
      from: `"ZUNARK" <${from}>`,
      to: data.email,
      subject: "We've received your enquiry — ZUNARK",
      html,
    });
  } catch (err) {
    console.error("Failed to send inquiry confirmation email:", err);
  }
}

export async function sendInquiryReviewedEmail(data: { name: string; email: string }) {
  const transport = getTransport();
  if (!transport) {
    console.warn("SMTP not configured — skipping reviewed email.");
    return;
  }

  const from = process.env.SMTP_USER;
  const firstName = data.name.trim().split(/\s+/)[0] || data.name;

  const html = `
    <div style="font-family:sans-serif;font-size:15px;color:#222;line-height:1.6;">
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Thanks for your patience — we've reviewed your enquiry and would like to connect with you to discuss it further before moving ahead.</p>
      <p>We'll be in touch shortly to arrange a conversation. If you'd like to reach us in the meantime, just reply to this email or contact us at info@zunark-ai.com.</p>
      <p>Best regards,<br>The ZUNARK Team</p>
    </div>
  `;

  try {
    await transport.sendMail({
      from: `"ZUNARK" <${from}>`,
      to: data.email,
      subject: "Your enquiry has been reviewed — ZUNARK",
      html,
    });
  } catch (err) {
    console.error("Failed to send inquiry reviewed email:", err);
  }
}

export async function sendProjectAcceptedEmail(data: { name: string; email: string; projectName: string }) {
  const transport = getTransport();
  if (!transport) {
    console.warn("SMTP not configured — skipping project accepted email.");
    return;
  }

  const from = process.env.SMTP_USER;
  const firstName = data.name.trim().split(/\s+/)[0] || data.name;

  const html = `
    <div style="font-family:sans-serif;font-size:15px;color:#222;line-height:1.6;">
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Good news — we've accepted your project (${escapeHtml(data.projectName)}) and are moving ahead. Our team will be in touch shortly with next steps, including a service agreement.</p>
      <p>If you have any questions in the meantime, just reply to this email or reach us at info@zunark-ai.com.</p>
      <p>Best regards,<br>The ZUNARK Team</p>
    </div>
  `;

  try {
    await transport.sendMail({
      from: `"ZUNARK" <${from}>`,
      to: data.email,
      subject: "Your project has been accepted — ZUNARK",
      html,
    });
  } catch (err) {
    console.error("Failed to send project accepted email:", err);
  }
}

export async function sendMeetingInviteEmail(data: {
  to: string;
  hostName: string;
  title: string;
  scheduledAt: Date;
  meetingId: string;
}) {
  const transport = getTransport();
  if (!transport) {
    console.warn("SMTP not configured — skipping meeting invite email.");
    return;
  }

  const from = process.env.SMTP_USER;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const joinUrl = `${baseUrl}/dashboard/meetings/${data.meetingId}`;
  const whenText = data.scheduledAt.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const html = `
    <div style="font-family:sans-serif;font-size:15px;color:#222;line-height:1.6;">
      <p>You've been invited to a meeting:</p>
      <h2 style="margin:8px 0;">${escapeHtml(data.title)}</h2>
      <p><b>Host:</b> ${escapeHtml(data.hostName)}<br><b>When:</b> ${escapeHtml(whenText)}</p>
      <p style="margin-top:20px;">
        <a href="${joinUrl}" style="display:inline-block;padding:10px 20px;background:#0f172a;color:#fff;border-radius:8px;text-decoration:none;">
          View meeting
        </a>
      </p>
      <p style="margin-top:20px;color:#888;font-size:12px;">You'll see a "Join" button here once it starts. This link only works if you're signed in to the zunark-ai dashboard.</p>
    </div>
  `;

  try {
    await transport.sendMail({
      from: `"ZUNARK" <${from}>`,
      to: data.to,
      subject: `Meeting invite: ${data.title}`,
      html,
    });
  } catch (err) {
    console.error("Failed to send meeting invite email:", err);
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}
