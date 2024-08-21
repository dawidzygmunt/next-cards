import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const game = await prisma.game.findFirst({
      where: {
        clerkId: userId,
      },
    })
    if (!game) {
      return new NextResponse("No game found", { status: 404 })
    }

    const players = await prisma.player.findMany({
      where: {
        gameId: game.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    })
    return NextResponse.json(players)
  } catch (error) {
    console.log("[PLAYERS]", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { playerName } = body

    const game = await prisma.game.findFirst({
      where: {
        clerkId: userId,
      },
    })

    if (!game) {
      return new NextResponse("No game found", { status: 404 })
    }

    const players = await prisma.player.create({
      data: {
        gameId: game.id,
        name: playerName,
      },
    })
    return NextResponse.json(players)
  } catch (error) {
    console.log("[PLAYERS]", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}
