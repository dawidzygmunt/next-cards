"use client"
import { changeTicketStatus } from "@/actions/tickets/change-ticket-status"
import { deleteTicket } from "@/actions/tickets/delete-ticket"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ticket } from "@prisma/client"
import { Check, Delete, Loader, MoreHorizontal, TicketPlus } from "lucide-react"
import toast from "react-hot-toast"

export const EditTicketTable = ({ ticket }: { ticket: Ticket }) => {
  const allStatus = [
    { status: "open", icon: <TicketPlus /> },
    { status: "in progress", icon: <Loader /> },
    { status: "done", icon: <Check /> },
  ]

  const statusToDisplay = allStatus.filter(
    (singleOption) => singleOption.status !== ticket.status
  )

  const handleDelete = () => {
    deleteTicket(ticket.id)
    toast.success("Ticket deleted")
  }

  const handleUpdate = (status: string) => {
    changeTicketStatus(ticket.id, status)
    toast.success("Ticket updated")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {statusToDisplay.map((status) => (
          <DropdownMenuItem
            className="flex gap-2 justify-between"
            onClick={() => {
              handleUpdate(status.status)
            }}
            key={status.status}
          >
            {status.status}
            {status.icon}
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem
          onClick={() => {
            handleDelete()
          }}
          className="flex gap-2 justify-between"
        >
          Remove
          <Delete size={20} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
