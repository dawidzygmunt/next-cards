'use client'

import { Player } from '@prisma/client'

const CurrentPlayer = ({
  index,
  players,
}: {
  index: number
  players: Player[]
}) => {
  const current = players[index % players.length]

  return (
    <div
      className="text-3xl text-white font-semibold transition-transform duration-500 opacity-100 animate-fade-in h-[40px]"
      key={current?.name}
    >
      {current?.name}
    </div>
  )
}

export default CurrentPlayer
