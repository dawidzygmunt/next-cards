"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const deleteTicket = async (ticketId: string) => {
  const deletedTicket = await prisma.ticket.delete({
    where: {
      id: ticketId,
    },
  })
  revalidatePath("/admin/tickets")
  return deletedTicket
}
