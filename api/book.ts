import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { type, name, email, phone, date, time, sessionTitle, sessionPrice, symptoms, notes } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const emailTo = process.env.FLO_EMAIL || "hi@floortjedeliefde.com";
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER || "";
  const smtpPass = process.env.SMTP_PASS || "";

  const subjectMap: Record<string, string> = {
    booking: `New Booking Request — ${sessionTitle} from ${name}`,
    lead: `New Guide Request — ${name} signed up for the 3x5 Breath Reset Guide`,
  };

  const bodyMap: Record<string, string> = {
    booking: `
<h2>New Booking Request</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;">
  <tr><td style="padding:6px 12px;font-weight:bold;">Session</td><td style="padding:6px 12px;">${sessionTitle} — ${sessionPrice}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${name}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;">${email}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;">Phone</td><td style="padding:6px 12px;">${phone || "—"}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;">Date</td><td style="padding:6px 12px;">${date}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;">Time</td><td style="padding:6px 12px;">${time}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;">Symptoms</td><td style="padding:6px 12px;">${symptoms?.join(", ") || "—"}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;">Notes</td><td style="padding:6px 12px;">${notes || "—"}</td></tr>
</table>
    `,
    lead: `
<h2>New Guide Download Request</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;">
  <tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${name}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;">${email}</td></tr>
</table>
    `,
  };

  if (!smtpUser || !smtpPass) {
    console.log("[book] SMTP not configured — would send email:", { type, name, email });
    return res.status(200).json({ ok: true, note: "SMTP not configured, logged to console" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"Come Back To Yourself" <${smtpUser}>`,
      to: emailTo,
      replyTo: email,
      subject: subjectMap[type] || `New submission from ${name}`,
      html: bodyMap[type] || `<p>Name: ${name}</p><p>Email: ${email}</p>`,
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("[book] Email send error:", err.message);
    return res.status(500).json({ error: "Failed to send notification email" });
  }
}
