import { cn } from '@/lib/utils'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

interface GameNavProps {
  title: string
  href: string
  className?: string
}

const GameNav = ({ title, href, className }: GameNavProps) => {
  return (
    <div
      className={cn(
        'bg-black/25 w-full p-3 text-white flex items-center justify-between sm:pt-0',
        className
      )}
    >
      <Link href={href}>
        <ArrowLeftIcon size={20} />
      </Link>

      <span className="text-xl uppercase font-semibold">{title}</span>
      <div></div>
    </div>
  )
}

export default GameNav
