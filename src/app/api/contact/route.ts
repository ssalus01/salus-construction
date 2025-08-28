// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, location, message, honeypot } = await req.json();

    // Honeypot check
    if (honeypot) return NextResponse.json({ ok: true });

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // GoDaddy SMTP (adjust if you use 365/Google)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtpout.secureserver.net",
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465, // true for 465
      auth: {
        user: process.env.SMTP_USER, // e.g. info@salusconstruction.co.uk
        pass: process.env.SMTP_PASS, // mailbox password / app password
      },
    });

    await transporter.sendMail({
      from: `"Salus Construction" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL || "info@salusconstruction.co.uk",
      replyTo: email,
      subject: `New Quote Request — ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "-"}</p>
        <p><strong>Location:</strong> ${location || "-"}</p>
        <p><strong>Message:</strong></p>
        <p>${String(message || "").replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ ok: false, error: "Email send failed" }, { status: 500 });
  }
}
