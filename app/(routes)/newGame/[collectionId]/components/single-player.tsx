'use client'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { XCircleIcon } from 'lucide-react'
import ManIcon from '@mui/icons-material/Man'
import WomanIcon from '@mui/icons-material/Woman'

interface SinglePlayerProps {
  playerName: string
  playerId: string
  onGenderSelect: (playerId: string, gender: 'M' | 'F') => void
  onDelete: (plyerId: string) => void
}

const SinglePlayer: React.FC<SinglePlayerProps> = ({
  playerName,
  playerId,
  onGenderSelect,
  onDelete,
}) => {
  return (
    <>
      <div className="flex items-center justify-between gap-7">
        <div className="bg-white shadow-lg rounded-lg my-2 p-1 px-3 border border-gray-300 w-full flex items-center justify-between">
          <h3 className="text-lg">{playerName}</h3>
          <span>
            <Button
              variant="ghost"
              onClick={() => onDelete(playerId)}
              className="m-0 p-0"
            >
              <XCircleIcon size={25} />
            </Button>
          </span>
        </div>
        <div className="flex">
          <ToggleGroup type="single">
            <ToggleGroupItem
              value="M"
              className="p-0 m-0"
              onClick={() => onGenderSelect(playerId, 'M')}
            >
              <ManIcon className="!w-[30px] !h-[30px]" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="F"
              className="p-0 m-0"
              onClick={() => onGenderSelect(playerId, 'F')}
            >
              <WomanIcon className="!w-[30px] !h-[30px]" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </>
  )
}

export default SinglePlayer
