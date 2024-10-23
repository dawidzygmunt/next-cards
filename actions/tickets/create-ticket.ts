"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const CreateTicket = async ({
  content,
  priority,
}: {
  content: string
  priority: number
}) => {
  const ticketCreate = await prisma.ticket.create({
    data: {
      content,
      priority,
    },
  })
  revalidatePath("/admin/tickets")

  return ticketCreate
}

export default CreateTicket
