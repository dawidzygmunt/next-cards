import { Plus } from 'lucide-react'
import { getAllCollections } from '@/actions/collections/get-all-collections'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import SingleCollection from './components/single-collection'

const GameCollection = async ({
  params,
}: {
  params: { editionId: string }
}) => {
  const collections = await getAllCollections(params.editionId)
  if ('error' in collections) {
    return <div>Nie mozna pobrac kart...</div>
  }

  const edition = await prisma.edition.findFirst({
    where: {
      id: params.editionId,
    },
  })

  if (edition && 'error' in edition) {
    return <div>Nie mozna pobrac kart...</div>
  }

  return (
    <div className="flex flex-col">
      <h1>
        Wszystkie wersje gry{' '}
        <span className="font-semibold">{edition?.name}</span>
      </h1>
      <div className="flex flex-1 gap-5 flex-wrap">
        <Link href={`/admin/editions/${params.editionId}/add`}>
          <div
            className="w-[200px] h-[200px] bg-green-400 rounded-xl flex justify-center items-center
        text-center hover:bg-green-600 hover:cursor-pointer transition-all duration-300"
          >
            <div className="text-center flex flex-col justify-center items-center">
              Dodaj nową wersję
              <Plus className="mt-1" />
            </div>
          </div>
        </Link>

        {collections &&
          collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/admin/all-cards/${collection.id}`}
            >
              <SingleCollection collection={collection} />
            </Link>
          ))}
      </div>
    </div>
  )
}

export default GameCollection
