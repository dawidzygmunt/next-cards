"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import React from "react"

const AddSingleEdition = async (name: string) => {
  try {
    const result = await prisma.edition.create({
      data: {
        name,
      },
    })
    revalidatePath("/admin/editions")
    return result
  } catch (error) {}
}

export default AddSingleEdition
