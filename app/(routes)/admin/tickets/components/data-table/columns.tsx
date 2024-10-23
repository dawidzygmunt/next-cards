"use client"

import { Button } from "@/components/ui/button"
import { Ticket } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { EditTicketTable } from "./actions-table"

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "content",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Content
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <span>{row.original.createdAt.toDateString().split("GMT")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span>{row.original.status}</span>,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => <span>{row.original.priority}</span>,
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const ticket = row.original
      return <EditTicketTable ticket={ticket} />
    },
  },
]
