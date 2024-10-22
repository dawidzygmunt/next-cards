import countAllCards from "@/actions/statistics/count-all-cards"
import countEditionsAndCollections from "@/actions/statistics/count-editions-and-collections"
import {
  Check,
  Diamond,
  ReceiptText,
  Spade,
  TrendingUp,
  User,
} from "lucide-react"
import AnalysticTile from "./components/analysticComponent"
import prisma from "@/lib/prisma"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { date } from "zod"
import getAllCards from "@/actions/cards/get-all-cards"

const AdminPanel = async () => {
  const { allCards, truthCards, dareCards } = await countAllCards()
  const { editions, collections } = await countEditionsAndCollections()

  const cards = await getAllCards()

  if ("error" in cards) {
    console.log("Uknown error")
    return
  }

  const games = await prisma.game.count({})

  const today = new Date().toDateString()

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-16">
        <div className="flex w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalysticTile
              title="Pytania"
              amount={truthCards as number}
              className="bg-purple-500"
            >
              <Check />
            </AnalysticTile>

            <AnalysticTile
              title="Wyzwania"
              amount={dareCards as number}
              className="bg-red-500"
            >
              <Spade />
            </AnalysticTile>

            <AnalysticTile
              title="Ilość gier"
              amount={collections as number}
              className="bg-green-500"
            >
              <Diamond />
            </AnalysticTile>

            <AnalysticTile
              title="Ilość wersji gier"
              amount={editions as number}
              className="bg-yellow-400"
            >
              <ReceiptText />
            </AnalysticTile>

            <AnalysticTile
              title="Wszystkich kart łącznie"
              amount={allCards as number}
              className="bg-blue-500"
            >
              <TrendingUp />
            </AnalysticTile>

            <AnalysticTile
              title="Aktualnie rozpoczętych gier"
              amount={games as number}
              className="bg-[#b629b6]"
            >
              <User />
            </AnalysticTile>
          </div>
        </div>
        <div>
          <Table>
            <TableCaption>Lista ostatnio dodanych kart</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Data</TableHead>
                <TableHead>Gra</TableHead>
                <TableHead>Treść</TableHead>
                <TableHead className="text-right">Wersja</TableHead>
              </TableRow>
            </TableHeader>
            {cards.map((card) => (
              <TableBody key={card.id}>
                <TableRow>
                  <TableCell className="font-medium">{today}</TableCell>
                  <TableCell>{card.Collection?.Edition.name}</TableCell>
                  <TableCell>{card.content}</TableCell>
                  <TableCell className="text-right">
                    {card.Collection?.name}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
