import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export async function GET(
  req: Request,
  { params }: { params: { type: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new Response("User not found", { status: 401 })
    }

    const game = await prisma.game.findFirst({
      where: {
        clerkId: userId,
      },
      include: {
        Players: true,
      },
    })

    const card = await prisma.card.findFirst({
      where: {
        type: params.type,
        amount: {
          gte: 0,
        },
      },
    })
  } catch (error) {
    console.log(error)
    return new Response("Something went wrong!", { status: 500 })
  }
}
