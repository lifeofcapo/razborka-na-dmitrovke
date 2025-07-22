import prisma from "@/lib/prisma";
import { hashPassword } from "@/util/hashpassword";
import {
  validatePassword,
  validatePhone,
  validateEmail,
} from "@/util/validateReg";
import { NextResponse } from "next/server";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const registrationAttempts = new Map<
  string,
  { count: number; firstAttempt: number }
>();

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const ip =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for") ||
    "unknown";
  const now = Date.now();

  if (registrationAttempts.has(ip)) {
    const { count, firstAttempt } = registrationAttempts.get(ip)!;
    if (count >= 10 && now - firstAttempt < 60 * 60 * 1000) {
      return NextResponse.json(
        { error: "Too many registration attempts" },
        { status: 429 }
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
    const { name, email, password, phone }: RegisterRequest = await req.json();
    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return NextResponse.json(
        { error: emailValidation.message },
        { status: 400 }
      );
    }
    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.isValid) {
      return NextResponse.json(
        { error: phoneValidation.message },
        { status: 400 }
      );
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        {
          error: "Password does not meet requirements",
          requirements: passwordValidation.requirements,
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
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
    return NextResponse.json(
      {
        ...safeUser,
        phone: `+${safeUser.phone}`, //Убедиться, что клиент видит +7
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
