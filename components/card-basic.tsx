import prisma from '@/lib/prisma'
import { Collection } from '@prisma/client'

interface Card {
  type: string
  content: string
  amount: number
  punishment: number
  collectionId: string
}

const CardBasic = ({
  data,
  collections,
}: {
  data: Card | undefined
  collections: Collection[]
}) => {
  const collection = collections.find(
    (collection) => collection.id === data?.collectionId
  )

  if (!data) {
    return <div>Wybierz...</div>
  }
  return (
    <div className="flex">
      <div className="card shadow-xl w-[250px] h-[350px] rounded-lg relative border-black border-[1px]">
        <div
          className="absolute flex top-0 left-0 bg-red-500 w-[20px] h-[20px] justify-center items-center 
          text-center text-xs text-white rounded-full -translate-x-1 -translate-y-1"
        >
          <span>{data.amount}</span>
        </div>
        <div className="font-bold text-4xl mb-4 text-center mt-3">
          <h1>{data.type}</h1>
        </div>

        <div className="flex text-wrap text-center justify-center m-8">
          {data.content}
        </div>

        <div className="absolute bottom-1 left-1">{collection?.name}</div>

        <div className="absolute right-1 bottom-1">{data.punishment}</div>
      </div>
    </div>
  )
}

export default CardBasic
