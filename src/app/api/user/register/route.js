import prisma from "@/lib/prisma";
import { hashPassword } from "@/util/hashpassword";
import {
  validatePassword,
  validatePhone,
  validateEmail,
} from "@/util/validateReg";

const registrationAttempts = new Map();

export default async function POST(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
  const now = Date.now();

  if (registrationAttempts.has(ip)) {
    const { count, firstAttempt } = registrationAttempts.get(ip);
    if (count >= 10 && now - firstAttempt < 60 * 60 * 1000) {
      return new Response(
        JSON.stringify({ error: "Too many registration attempts" }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    registrationAttempts.set(ip, {
      count: count + 1,
      firstAttempt,
    });
  } else {
    registrationAttempts.set(ip, { count: 1, firstAttempt: now });
  }

  try {
    const { name, email, password, phone } = await request.json();
    if (!name || !email || !password || !phone) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return new Response(JSON.stringify({ error: emailValidation.message }), {
        status: 400,
      });
    }
    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.isValid) {
      return new Response(JSON.stringify({ error: phoneValidation.message }), {
        status: 400,
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return new Response(
        JSON.stringify({
          error: "Password does not meet requirements",
          requirements: passwordValidation.requirements,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email already registered" }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const phoneForDb = phone.replace(/\D/g, "");
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: phoneForDb,
      },
    });

    const { password: _, ...safeUser } = newUser;
    return new Response(
      JSON.stringify({
        ...safeUser,
        phone: `+${safeUser.phone}`, // Ensure client sees +7 format
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
