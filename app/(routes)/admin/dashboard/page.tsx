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

const AdminPanel = async () => {
  const { allCards, truthCards, dareCards } = await countAllCards()
  const { editions, collections } = await countEditionsAndCollections()

  const games = await prisma.game.count({})

  return (
    <div className="flex">
      <div className="grid grid-cols-2 gap-6">
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
          title="Kolekcje"
          amount={collections as number}
          className="bg-green-500"
        >
          <Diamond />
        </AnalysticTile>

        <AnalysticTile
          title="Ilość edycji"
          amount={editions as number}
          className="bg-yellow-400"
        >
          <ReceiptText />
        </AnalysticTile>

        <AnalysticTile
          title="Wszystkich kart"
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
  )
}

export default AdminPanel
