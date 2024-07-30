"use server"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

const { userId } = auth()

const createNewGame = async () => {
  try {
    if (!userId) {
      return { error: "Zaloguj się" }
    }
    const game = await prisma.game.findFirst({
      where: {
        clerkId: userId,
      },
    })
    if (game) return
    const result = await prisma.game.create({
      data: {
        clerkId: userId,
      },
    })
    return result
  } catch (error) {
    console.log(error)
  }
}

export default createNewGame
