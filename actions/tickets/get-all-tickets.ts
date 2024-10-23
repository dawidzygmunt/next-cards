"use server"
import prisma from "@/lib/prisma"

export const getAllTickets = async () => {
  const tickets = await prisma.ticket.findMany()
  return tickets
}
