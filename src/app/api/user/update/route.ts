import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface UpdateRequest {
  id: string;
  [key: string]: any;
}

export async function PUT(request: Request) {
  try {
    const { id, ...updateData }: UpdateRequest = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (updateData.phone) {
      updateData.phone = updateData.phone.replace(/^\+7/, "");
    }
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    const { password: _, ...safeUser } = updatedUser;
    return NextResponse.json(
      {
        ...safeUser,
        phone: `+7${safeUser.phone}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
