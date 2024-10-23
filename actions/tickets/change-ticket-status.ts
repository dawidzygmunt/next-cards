"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const changeTicketStatus = async (ticketId: string, status: string) => {
  const updatedStatus = await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status,
    },
  })
  revalidatePath("/admin/tickets")
  return updatedStatus
}
