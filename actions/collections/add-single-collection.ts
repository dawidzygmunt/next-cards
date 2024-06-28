"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const addSingleCollection = async (name: string, price: number) => {
  try {
    const result = await prisma.collection.create({
      data: {
        name,
        price,
      },
    })
    revalidatePath("/admin/editions/")
    return result
  } catch (error: any) {
    if ("errors" in error && error.errors.length > 0)
      return { error: error.errors[0].message }
    return { error: "Something went wrong!" }
  }
}
