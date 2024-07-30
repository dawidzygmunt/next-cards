import { useEffect, useState } from "react"
import AnalysticTile from "./components/analysticComponent"
import axios from "axios"
import { Check, Diamond, Spade, TrendingUp } from "lucide-react"
import countAllCards from "@/actions/statistics/count-all-cards"
import countEditionsAndCollections from "@/actions/statistics/count-editions-and-collections"

const AdminPanel = async () => {
  const { allCards, truthCards, dareCards } = await countAllCards()
  const { editions, collections } = await countEditionsAndCollections()

  // const truthCardsBasic = async () => {
  //   const response = await axios.get("/api/v1/statistics/truth-basic")
  //   setTruthBasic(response.data.nbHits)
  // }

  // const challengeCardsBasic = async () => {
  //   const response = await axios.get("/api/v1/statistics/challenge-basic")
  //   setChallengeBasic(response.data.nbHits)
  // }

  // const truthCards = async () => {
  //   const response = await axios.get("/api/v1/statistics/truth")
  //   setTruth(response.data.nbHits)
  // }

  // const challengeCards = async () => {
  //   const response = await axios.get("/api/v1/statistics/challenge")
  //   setChallenge(response.data.nbHits)
  // }

  // const getcolections = async () => {
  //   const response = await axios.get("/api/v1/collections")
  //   console.log(response)

  //   setCollections(response.data.nbHits)
  // }

  return (
    <div className="flex">
      <div className="grid grid-cols-2 gap-6">
        <AnalysticTile
          title="Wszystkich kart"
          amount={allCards as number}
          className="bg-blue-500"
        >
          <TrendingUp />
        </AnalysticTile>
        <AnalysticTile
          title="Kolekcje"
          amount={collections as number}
          className="bg-green-500"
        >
          <Spade />
        </AnalysticTile>
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
          <Diamond />
        </AnalysticTile>
        <AnalysticTile title="Ilość edycji" amount={editions as number} />
        <AnalysticTile title="Ilość kolekcji" amount={collections as number} />
        {/* <AnalysticTile title="Wyzwań z powt" amount={challenge as number} /> */}
      </div>
    </div>
  )
}

export default AdminPanel
