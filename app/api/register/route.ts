import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// --- Input sanitisation ---
function sanitize(value: unknown, maxLen = 500): string {
  if (typeof value !== "string") return "";
  return value
    .trim()
    .slice(0, maxLen)
    .replace(/[<>]/g, ""); // strip angle brackets to prevent HTML injection
}

// --- Validators ---
function validateName(name: string): string | null {
  if (!name) return "Full name is required.";
  if (name.length < 2) return "Name must be at least 2 characters.";
  return null;
}

function validatePhone(phone: string): string | null {
  if (!phone) return "Phone number is required.";
  if (!/^[\d\s\+\-\(\)]{6,20}$/.test(phone)) return "Please provide a valid phone number.";
  return null;
}

function validateEmail(email: string): string | null {
  if (!email) return null; // optional
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please provide a valid email address.";
  return null;
}

// --- Rate limiting (simple in-memory, per IP) ---
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // requests
const RATE_WINDOW_MS = 60 * 1000; // per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  // Parse body
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Sanitise
  const name = sanitize(body.name, 100);
  const phone = sanitize(body.phone, 30);
  const email = sanitize(body.email, 200);
  const course = sanitize(body.course, 100);
  const message = sanitize(body.message, 2000);

  // Validate
  const errors: Record<string, string> = {};
  const nameErr = validateName(name);
  const phoneErr = validatePhone(phone);
  const emailErr = validateEmail(email);
  if (nameErr) errors.name = nameErr;
  if (phoneErr) errors.phone = phoneErr;
  if (emailErr) errors.email = emailErr;

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation failed.", errors }, { status: 422 });
  }

  // Send email
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailTo = process.env.EMAIL_TO ?? emailUser;

  if (!emailUser || !emailPass) {
    console.error("Email credentials not configured. Set EMAIL_USER and EMAIL_PASS in .env.local");
    // Still return success to user — don't leak config state
    return NextResponse.json({ message: "Registration received.", data: { name, phone } });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: emailUser, pass: emailPass },
  });

  const mailOptions = {
    from: `"Modem Computer Technology Website" <${emailUser}>`,
    to: emailTo,
    replyTo: email || undefined,
    subject: `New Enquiry from ${name}`,
    text: [
      "New Registration / Enquiry",
      "─".repeat(40),
      `Name:    ${name}`,
      `Phone:   ${phone}`,
      `Email:   ${email || "—"}`,
      `Course:  ${course || "—"}`,
      `Message: ${message || "—"}`,
    ].join("\n"),
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px">
        <h2 style="color:#1e40af;margin:0 0 20px">New Enquiry — Modem Computer Technology</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${[
            ["Name", name],
            ["Phone", phone],
            ["Email", email || "—"],
            ["Course / Area", course || "—"],
            ["Message", message || "—"],
          ].map(([k, v]) => `
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;width:120px;vertical-align:top"><strong>${k}</strong></td>
              <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#0f172a">${v}</td>
            </tr>
          `).join("")}
        </table>
        <p style="margin:20px 0 0;font-size:12px;color:#94a3b8">Sent from modemcomputertechnology.com</p>
      </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Failed to send email. Please contact us directly." }, { status: 500 });
  }

  return NextResponse.json({ message: "Registration successful.", data: { name, phone } });
}
