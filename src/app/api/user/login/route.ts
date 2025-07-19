import prisma from "@/lib/prisma";
import { comparePasswords } from "@/util/hashpassword";

export default async function POST(req, res) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "End" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { password: _, ...safeUser } = user;
    return new Response(JSON.stringify(safeUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
