// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, phone, location, message, honeypot } = await req.json();

    // Honeypot (spam bot) check
    if (honeypot) return NextResponse.json({ ok: true });

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "onboarding@resend.dev",   // ✅ Sandbox sender
      to: "fayeq@salusconstruction.co.uk", // ✅ Where submissions land
      replyTo: email, // So you can hit reply and contact them directly
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
    return NextResponse.json(
      { ok: false, error: "Email send failed" },
      { status: 500 }
    );
  }
}
