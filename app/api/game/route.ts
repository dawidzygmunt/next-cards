import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

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
    return NextResponse.json(game)
  } catch (error) {
    console.log("[GAME]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const body = await req.json()
    const { collectionId } = body
    console.log("[GAME]", collectionId)

    const previousGame = await prisma.game.findFirst({
      where: {
        clerkId: userId,
      },
    })

    if (previousGame) {
      await prisma.assignedCard.deleteMany({
        where: {
          gameId: previousGame.id,
        },
      })
      await prisma.player.deleteMany({
        where: {
          gameId: previousGame.id,
        },
      })
      await prisma.game.delete({
        where: {
          id: previousGame.id,
        },
      })
    }

    const game = await prisma.game.create({
      data: {
        clerkId: userId,
        status: "in progress",
        collectionId: collectionId,
      },
    })
    return NextResponse.json(game)
  } catch (error) {
    console.log("[GAME]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
