import SingleEdition from './components/singleEdition'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import getAllEditions from '@/actions/editions/get-all-editions'

const CardEditions = async () => {
  const editions = await getAllEditions()

  return (
    <div className="flex flex-col">
      <h1>All editions</h1>
      <div className="flex flex-1 gap-5 flex-wrap">
        <Link href={'/admin/editions/add'}>
          <div
            className="w-[200px] h-[200px] bg-slate-400 rounded-xl flex justify-center items-center
          text-center hover:bg-slate-300 hover:cursor-pointer transition-all duration-300"
          >
            <div className="text-center flex flex-col justify-center items-center">
              Dodaj nową gre
              <Plus className="mt-1" />
            </div>
          </div>
        </Link>

        {editions &&
          editions.map((edition) => (
            <Link
              key={edition.id}
              href={`/admin/editions/${edition.id}`}
            >
              <SingleEdition edition={edition} />
            </Link>
          ))}
      </div>
    </div>
  )
}

export default CardEditions
