"use server"
import prisma from "@/lib/prisma"

const getAllEditions = async () => {
  try {
    return await prisma.edition.findMany()
  } catch (error) {}
}

export default getAllEditions
