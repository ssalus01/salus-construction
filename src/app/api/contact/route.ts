// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, location, message, honeypot } = await req.json();

    if (honeypot) return NextResponse.json({ ok: true });
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const host = process.env.SMTP_HOST || "smtp.office365.com"; // 365 default
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER; // fayeq@...
    const pass = process.env.SMTP_PASS; // mailbox/app password
    const to = process.env.TO_EMAIL || "fayeq@salusconstruction.co.uk";
    const from = process.env.FROM_EMAIL || `Salus Construction <${user}>`;

    if (!user || !pass) {
      console.error("SMTP creds missing");
      return NextResponse.json({ ok: false, error: "Server email not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465=SSL, 587=TLS
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,             // "Salus Construction <fayeq@...>"
      to,               // where you receive it
      replyTo: email,   // visitor's email
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
