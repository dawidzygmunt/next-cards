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
  const previous = players[(index - 1 + players.length) % players.length]
  const next = players[(index + 1) % players.length]

  return (
    <div
      className="text-3xl text-black font-semibold transition-transform duration-500 opacity-100 animate-fade-in h-[40px]"
      key={current?.name}
    >
      {current?.name}
    </div>
  )
}

export default CurrentPlayer
