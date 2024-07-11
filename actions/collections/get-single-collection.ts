"use server"

import prisma from "@/lib/prisma"

export const getSingleCollection = async (collectionId: string) => {
  try {
    const result = await prisma.collection.findFirst({
      where: {
        id: collectionId,
      },
    })
    return result
  } catch (error: any) {
    console.log(error);
    
    if ("errors" in error && error.errors.length > 0)
      return { error: error.errors[0].message }
    return { error: "Something went wrong!" }
  }
}
