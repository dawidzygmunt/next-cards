"use client"
import CardBasic from "@/components/card-basic"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import CurrentPlayer from "./components/current-player"
import { Card } from "@prisma/client"
import { useDrawCard } from "@/hooks/game/use-draw-card"
import { set } from "zod"
import useGetPlayers from "@/hooks/players/use-get-players"
import toast from "react-hot-toast"
import { currentUser } from "@clerk/nextjs/server"

const dataTest: Card = {
  id: "1",
  type: "Pierwsza karta",
  collectionId: "Test",
  amount: 1,
  content: "Test",
  createdAt: new Date(),
  updatedAt: new Date(),
  punishment: 3,
}

const Game = () => {
  const [playerIndex, setPlayerIndex] = useState(0)
  const [data, setData] = useState(dataTest)
  const [animation, setAnimation] = useState("")
  const mutationFn = useDrawCard()
  const playersQuery = useGetPlayers()
  const players = playersQuery.data || []
  const totalPlayers = players.length || 0

  const handleNext = async () => {
    if (totalPlayers === 0) {
      toast.error("Nie znaleziono graczy")
      return
    }
    setAnimation("animate-scrollUp")
    setTimeout(async () => {
      setPlayerIndex((prevIndex) => (prevIndex + 1) % totalPlayers)
      setAnimation("")
    }, 200)

    const currentPlayer = players[playerIndex]

    const data = await mutationFn.mutateAsync({
      type: "Prawda",
      playerId: currentPlayer.id,
    })
    console.log(data)
    setData(data)
  }

  const handlePrev = async () => {
    if (totalPlayers === 0) {
      toast.error("Nie znaleziono graczy")
      return
    }
    setAnimation("animate-scrollDown")
    setTimeout(() => {
      setPlayerIndex(
        (prevIndex) => (prevIndex - 1 + totalPlayers) % totalPlayers
      )
      setAnimation("")
    }, 200)

    const currentPlayer = players[playerIndex]

    const data = await mutationFn.mutateAsync({
      type: "Wyzwanie",
      playerId: currentPlayer.id,
    })
    console.log(data)
    setData(data)
  }

  return (
    <div className="flex flex-col w-full min-h-screen p-5 items-center">
      <CurrentPlayer index={playerIndex} players={players} />
      <CardBasic data={data} />
      <div className="flex flex-col gap-3 p-3 ">
        <Button
          onClick={handleNext}
          disabled={mutationFn.isPending}
          className="px-20 py-6 font-bold tracking-wider bg-purple-600 
          hover:bg-purple-700 border shadow-md"
        >
          Prawda
        </Button>

        <Button
          onClick={handlePrev}
          disabled={mutationFn.isPending}
          className="px-20 py-6 font-bold tracking-wider bg-red-500 border 
          shadow-md hover:bg-red-600"
        >
          Wyzwanie
        </Button>
      </div>
    </div>
  )
}

export default Game
