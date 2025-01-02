'use client'
import { Button } from '@/components/ui/button'
import useDeletePlayer from '@/hooks/players/use-delete-player'
import { XCircleIcon } from 'lucide-react'

interface SinglePlayerProps {
  playerName: string
  playerId: string
}

const SinglePlayer: React.FC<SinglePlayerProps> = ({
  playerName,
  playerId,
}) => {
  const deleteMutation = useDeletePlayer()

  // delete player
  const handleDeleteButton = async () => {
    deleteMutation.mutate(playerId)
  }

  return (
    <>
      <div className="flex items-center justify-between gap-7">
        <div className="bg-white shadow-lg rounded-lg my-2 p-1 px-3 border border-gray-300 p2-3 w-full flex items-center justify-between">
          <h3 className="text-lg">{playerName}</h3>
          <span>
            <Button
              variant="ghost"
              onClick={handleDeleteButton}
              className="m-0 p-0"
            >
              <XCircleIcon size={25} />
            </Button>
          </span>
        </div>
        <div className="flex">
          <Button variant="ghost">M</Button>
          <Button variant="ghost">F</Button>
        </div>
      </div>
    </>
  )
}

export default SinglePlayer
