'use client'
import CardBasic from '@/components/card-basic'
import GameNav from '@/components/game-nav'
import { Button } from '@/components/ui/button'
import { useDrawCard } from '@/hooks/game/use-draw-card'
import useGetPlayers from '@/hooks/players/use-get-players'
import { Card } from '@prisma/client'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CurrentPlayer from './components/current-player'
import ContentDisplay from './components/content-display'

const Game = () => {
  const mutationFn = useDrawCard()
  const { data: players, isSuccess } = useGetPlayers()
  console.log(isSuccess)

  const [playerIndex, setPlayerIndex] = useState(0)
  const [data, setData] = useState<Card>()
  const totalPlayers = players?.length || 0
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (isSuccess) {
      setStage(1)
    }
  }, [isSuccess])

  if (!players || !isSuccess) {
    return
  }

  const handleTruth = async () => {
    if (totalPlayers === 0) {
      toast.error('Nie znaleziono graczy')
      return
    }

    const currentPlayer = players[playerIndex]

    const { data, status } = await mutationFn.mutateAsync({
      type: 'Prawda',
      playerId: currentPlayer.id,
    })
    setData(data)

    // Stop changing player if there are no cards left
    if (status === 203) {
      setStage(5)
      return
    }
    setStage(2)
  }

  const handleDare = async () => {
    if (totalPlayers === 0) {
      toast.error('Nie znaleziono graczy')
      return
    }

    const currentPlayer = players[playerIndex]

    const { data, status } = await mutationFn.mutateAsync({
      type: 'Wyzwanie',
      playerId: currentPlayer.id,
    })

    setData(data)

    // Stop changing player if there are no cards left
    if (status === 203) {
      setStage(5)
      return
    }
    setStage(2)
  }

  const handleNext = () => {
    setStage(0)
    setPlayerIndex((prevIndex) => (prevIndex + 1) % totalPlayers)
    setStage(1)
  }

  return (
    <div className="flex flex-col items-center h-full justify-between">
      <div className="w-full flex flex-col items-center gap-8">
        <GameNav
          title="Prawda czy wyzwanie"
          href="/"
        />
        <CurrentPlayer
          index={playerIndex}
          players={players}
        />
        {(stage === 2 || stage === 5) && <ContentDisplay data={data} />}
      </div>

      {/* Truth and Dare buttons */}
      {(stage === 1 || stage === 5) && (
        <div className="w-full flex flex-col text-center p-7">
          <Button
            onClick={handleTruth}
            disabled={mutationFn.isPending}
            className="p-8 font-semibold shadow-md text-4xl uppercase"
          >
            Prawda
          </Button>
          <span className="text-white font-bold text-2xl p-2">czy</span>
          <Button
            onClick={handleDare}
            disabled={mutationFn.isPending}
            className="p-8 font-semibold shadow-md text-4xl uppercase mx-0"
          >
            Wyzwanie
          </Button>
        </div>
      )}

      {stage === 2 && (
        <div className="w-full flex flex-col text-center p-8 gap-3 bg-black/20 rounded-br-xl rounded-bl-xl">
          <Button
            onClick={handleNext}
            disabled={mutationFn.isPending}
            className="p-7 font-semibold shadow-md text-xl uppercase"
          >
            Zaliczone!
          </Button>
          <Button
            onClick={handleNext}
            disabled={mutationFn.isPending}
            className="p-7 font-semibold shadow-md text-xl uppercase"
            variant="outline"
          >
            Kłamstwo
          </Button>
        </div>
      )}
    </div>
  )
}

export default Game
