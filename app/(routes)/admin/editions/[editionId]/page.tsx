import { Plus } from "lucide-react"

import SingleCollection from "./components/single-collection"
import Link from "next/link"
import { useParams } from "next/navigation"
import { getAllCollections } from "@/actions/collections/get-all-collections"
import toast from "react-hot-toast"

const GameCollection = async ({
  params,
}: {
  params: { editionId: string }
}) => {
  const collections = await getAllCollections(params.editionId)
  if ("error" in collections) {
    toast.error(collections.error)
    return
  }

  return (
    <div className="flex flex-1 gap-5 flex-wrap">
      <Link href={`/admin/editions/${params.editionId}/add`}>
        <div
          className="w-[200px] h-[200px] bg-slate-400 rounded-xl flex justify-center items-center
        text-center hover:bg-slate-300 hover:cursor-pointer transition-all duration-300"
        >
          <div className="text-center flex flex-col justify-center items-center">
            Dodaj nową kolekcję
            <Plus className="mt-1" />
          </div>
        </div>
      </Link>

      {collections &&
        collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/admin/all-cards?collection=${collection.id}}`}
          >
            <SingleCollection collection={collection} />
          </Link>
        ))}
    </div>
  )
}

export default GameCollection
