import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name = "",
      email = "",
      company = "",
      phone = "",
      need = "",
      message = "",
    } = body || {};

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const to = "ramtin.react@gmail.com";

    const subject = `ByteForge Lead — ${need || "Inquiry"} — ${name}`;
    const text = `
New ByteForge Lead

Name: ${name}
Email: ${email}
Company: ${company}
Phone: ${phone}
Need: ${need}

Message:
${message}
    `.trim();

    await transporter.sendMail({
      from: `ByteForge Website <${process.env.GMAIL_USER}>`,
      to,
      replyTo: email,
      subject,
      text,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err?.message || "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
