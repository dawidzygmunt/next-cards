'use client'
import deleteSingleCard from '@/actions/cards/delete-single-card'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface CardAllCardsProps {
  data: {
    Collection: {
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
      price: number
      editionId: string
    } | null
  } & {
    id: string
    type: string
    content: string
    createdAt: Date
    updatedAt: Date
    amount: number
    punishment: number
    collectionId: string
  }
}

const CardAllCards = ({ data }: CardAllCardsProps) => {
  console.log(data)

  const handleDelete = async () => {
    const result = deleteSingleCard(data.id)
    if ('error' in result) {
      toast.error('Something went wrong')
      return
    }
    toast.success('Card deleted successfully')
  }

  return (
    <>
      <ContextMenuTrigger>
        <div className="flex">
          <div className="card shadow-xl w-[200px] h-[250px] rounded-lg relative border-black border-[1px] hover:border-gray-400 hover:-translate-y-1 hover:shadow-xl transition-all">
            <div
              className="absolute flex top-0 left-0 bg-red-500 w-[20px] h-[20px] justify-center items-center 
          text-center text-xs text-white rounded-full -translate-x-1 -translate-y-1"
            >
              <span>{data.amount}</span>
            </div>
            <div className="font-bold text-xl mb-4 text-center mt-3">
              <h1>{data.type}</h1>
            </div>

            <div className="flex text-wrap w-auto justify-center text-center text-sm m-3">
              {data.content}
            </div>

            <h5 className="absolute bottom-1 left-1 text-sm">
              {data.Collection?.name}
            </h5>

            <div className="absolute right-1 bottom-1 text-sm">
              {data.punishment}
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <Link href={`/admin/new-card/${data.id}`}>
          <ContextMenuItem>Edit</ContextMenuItem>
        </Link>
        <ContextMenuItem onClick={handleDelete}>Delete</ContextMenuItem>
      </ContextMenuContent>
    </>
  )
}

export default CardAllCards
