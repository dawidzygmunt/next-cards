import { getAllCollections } from "@/actions/collections/get-all-collections"
import prisma from "@/lib/prisma"
import React from "react"
import CollectionCard from "./components/collection-card"

const SelectColection = async () => {
  const edition = await prisma.edition.findFirst({
    where: {
      name: "Prawda czy Wyzwanie",
    },
  })
  if (!edition) {
    return <h1>Brak edycji</h1>
  }
  const collections = await getAllCollections(edition.id)
  if ("error" in collections) {
    return <h1>{collections.error}</h1>
  }
  return (
    <div className="flex flex-col w-full min-h-screen mt-10 lg:mt-20 items-center">
      <h1 className="text-4xl text-center font-semibold">Wybierz wersje gry</h1>
      <div className="py-10 flex flex-col md:grid md:grid-cols-2 gap-6">
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
