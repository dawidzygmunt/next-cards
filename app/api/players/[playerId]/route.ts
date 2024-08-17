import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { playerId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const players = await prisma.player.delete({
      where: {
        id: params.playerId,
      },
    })
    return NextResponse.json(players)
  } catch (error) {
    console.log("[PLAYERS]", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}
