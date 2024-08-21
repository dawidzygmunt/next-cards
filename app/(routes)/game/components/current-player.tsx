"use client"

const CurrentPlayer = ({
  index,
  players,
}: {
  index: number
  players: { name: string }[]
}) => {
  const current = players[index % players.length]
  const previous = players[(index - 1 + players.length) % players.length]
  const next = players[(index + 1) % players.length]
  console.log(current, previous, next)

  return (
    <div className="flex flex-col items-center">
      <div className="text-slate-400">{next?.name}</div>
      <div className="text-3xl text-black font-semibold">{current?.name}</div>
      <div className="text-slate-400">{previous?.name}</div>
    </div>
  )
}

export default CurrentPlayer
