import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

const GameNav = ({ title, href }: { title: string; href: string }) => {
  return (
    <div className="bg-black/25 w-full p-3 text-white flex items-center justify-between sm:pt-0">
      <Link href={href}>
        <ArrowLeftIcon size={20} />
      </Link>

      <span className="text-xl uppercase font-semibold">{title}</span>
      <div></div>
    </div>
  )
}

export default GameNav
