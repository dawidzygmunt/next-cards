import { getAllCollections } from '@/actions/collections/get-all-collections'
import prisma from '@/lib/prisma'
import React from 'react'
import CollectionCard from './components/collection-card'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import GameNav from '@/components/game-nav'

const SelectColection = async () => {
  const edition = await prisma.edition.findFirst({
    where: {
      name: 'Prawda czy Wyzwanie',
    },
  })
  if (!edition) {
    return <h1>Brak edycji</h1>
  }
  const collections = await getAllCollections(edition.id)
  if ('error' in collections) {
    return <h1>{collections.error}</h1>
  }
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="flex flex-col w-full gap-8 pt-6 p-16 max-w-[600px]">
        {collections.map((collection) => (
          <CollectionCard
            name={collection.name}
            collectionId={collection.id}
            key={collection.id}
          />
        ))}
      </div>
    </div>
  )
}

export default SelectColection
