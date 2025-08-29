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

    // Sanity check envs
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json({ ok: false, error: "Server email not configured" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.FROM_EMAIL || "onboarding@resend.dev";
    const to = process.env.TO_EMAIL || "fayeq@salusconstruction.co.uk";

    // Call Resend and catch API-level errors
    const { data, error } = await resend.emails.send({
      from,
      to,
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

    if (error) {
      // This is the bit your current code was missing
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Email send failed" }, { status: 502 });
    }

    console.log("Resend message id:", data?.id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Contact form error:", err?.message || err);
    return NextResponse.json({ ok: false, error: "Email send failed" }, { status: 500 });
  }
}
