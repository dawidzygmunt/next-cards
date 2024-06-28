"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const deleteSingleCollection = async (id: string) => {
  try {
    const result = await prisma.collection.delete({
      where: {
        id,
      },
    })
    revalidatePath("/admin/collections")
    return result
  } catch (error: any) {
    if ("errors" in error && error.errors.length > 0)
      return { error: error.errors[0].message }
    return { error: "Something went wrong!" }
  }
}
