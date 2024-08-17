"use client"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import useDeletePlayer from "@/hooks/players/use-delete-player"

interface SinglePlayerProps {
  playerName: string
  playerID: string
}

const SinglePlayer: React.FC<SinglePlayerProps> = ({
  playerName,
  playerID,
}) => {
  const deleteMutation = useDeletePlayer()

  // delete player
  const handleDeleteButton = async () => {
    deleteMutation.mutate(playerID)
  }

  return (
    <div className="flex justify-between items-center bg-white shadow-lg rounded-lg my-2 p-2 w-full border border-gray-300">
      <h3 className="text-xl">{playerName}</h3>
      <span>
        <Button
          variant="destructive"
          size="sm"
          className="mx-1 px-4 py-1 text-xs"
          onClick={handleDeleteButton}
        >
          <Trash2 size={15} />
        </Button>
      </span>
    </div>
  )
}

export default SinglePlayer
