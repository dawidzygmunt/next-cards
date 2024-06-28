"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import React from "react"

const deleteSingleEdition = async (id: string) => {
  try {
    const result = await prisma.edition.delete({
      where: {
        id,
      },
    })
    revalidatePath("/admin/editions")
    return result
  } catch (error: any) {
    if ("errors" in error && error.errors.length > 0)
      return { error: error.errors[0].message }
    return { error: "Something went wrong!" }
  }
}

export default deleteSingleEdition
