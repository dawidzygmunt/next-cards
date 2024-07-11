"use server"
import prisma from "@/lib/prisma"

export const getAllCollections = async () => {
  try {
    const result = await prisma.collection.findMany()
    return result
  } catch (error: any) {
    if ("errors" in error && error.errors.length > 0)
      return { error: error.errors[0].message }
    return { error: "Something went wrong!" }
  }
}
