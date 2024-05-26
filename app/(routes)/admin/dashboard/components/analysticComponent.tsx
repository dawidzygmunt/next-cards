import { cn } from "@/lib/utils";

interface AnalysticTileProps {
  title: string,
  amount: number,
  className?: string | null
  children?: React.ReactNode
}

const AnalysticTile: React.FC<AnalysticTileProps> = ({
  title,
  amount,
  className,
  children
}) => {
  return (
    <div className={cn(
      `bg-white rounded-md shadow-lg hover:shadow-xl duration-300 ease-in-out min-h-[200px] min-w-[320px]`
    )}>

      <div className="flex flex-col items-center justify-center pt-5">
        <div className={cn(
          `rounded-full w-[70px] h-[70px] shadow-lg ${className}`
        )}>
          <div className="flex justify-center items-center w-full h-full text-white">
            {children}
          </div>
        </div>
        <p className="mt-3 text-slate-500">{title}</p>
        <span className="text-2xl font-bold">{amount}</span>
        <p>{ }</p>
      </div>

      <div className="flex mx-5">
        <div className="flex items-center justify-center ">
          <p></p>
        </div>
      </div>
    </div>
  )
}

export default AnalysticTile;