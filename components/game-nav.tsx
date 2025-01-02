import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

const GameNav = ({ title, href }: { title: string; href: string }) => {
  return (
    <div className="bg-black/25 w-full sticky top-0 p-3 text-white flex items-center justify-between">
      <Link href={href}>
        <ArrowLeftIcon size={20} />
      </Link>

      <h1 className="text-xl uppercase font-semibold">{title}</h1>
      <div></div>
    </div>
  )
}

export default GameNav
