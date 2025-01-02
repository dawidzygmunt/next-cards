import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Ellipsis } from 'lucide-react'
import { DataTable } from './components/data-table/data-table'
import { columns } from './components/data-table/columns'
import prisma from '@/lib/prisma'
import { getAllTickets } from '@/actions/tickets/get-all-tickets'

const Tickets = async () => {
  const tickets = await getAllTickets()

  return (
    <div className="flex flex-col ">
      <h1>Tickets</h1>
      <DataTable
        columns={columns}
        data={tickets}
      />
    </div>
  )
}

export default Tickets
