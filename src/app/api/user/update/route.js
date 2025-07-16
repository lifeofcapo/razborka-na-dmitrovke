import prisma from "@/lib/prisma";

export async function PUT(request) {
  try {
    const { id, ...updateData } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }

    if (updateData.phone) {
      updateData.phone = updateData.phone.replace(/^\+7/, "");
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    const { password: _, ...safeUser } = updatedUser;
    return new Response(
      JSON.stringify({
        ...safeUser,
        phone: `+7${safeUser.phone}`,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
