"use server"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

const continueGame = async () => {
  try {
    const { userId } = auth()
    if (!userId) {
      throw new Error("User not found")
    }
    const result = await prisma.game.findFirst({
      where: {
        clerkId: userId,
      },
    })
    if (!result) {
      return { error: "Nie masz żadnej rozpoczętej gry" }
    }
    return result
  } catch (error: any) {
    console.log(error)
    if ("errors" in error && error.errors.length > 0)
      return { error: error.errors[0].message }
    return { error: "Something went wrong!" }
  }
}

export default continueGame
