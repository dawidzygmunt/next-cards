import { BatteryFull, Signal, Wifi } from 'lucide-react'

const StatusBar = () => {
  const date = new Date()
  return (
    <div className="flex justify-between items-center h-full px-6 text-xs">
      <span className="font-semibold ml-4">
        {date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}
      </span>
      <div className="flex h-full mx-2 space-x-2 items-center justify-center">
        <Signal size={15} />
        <Wifi size={15} />
        <BatteryFull size={15} />
      </div>
    </div>
  )
}

const Notch = () => (
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl flex justify-center items-end pb-1 z-10">
    <div className="w-16 h-1 bg-gray-800 rounded-full"></div>
  </div>
)

const HomeIndicator = () => (
  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-black rounded-full"></div>
)

export const IPhoneFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[378px] h-[700px] hidden sm:block">
      {/* Frame */}
      <div className="relative rounded-[60px] bg-black p-2 shadow-xl">
        {/* Buttons */}
        <div className="absolute -left-1 top-24 h-20 w-1 bg-gray-800 rounded-l-lg"></div>
        <div className="absolute -right-1 top-16 h-10 w-1 bg-gray-800 rounded-r-lg"></div>
        <div className="absolute -right-1 top-32 h-16 w-1 bg-gray-800 rounded-r-lg"></div>

        {/* internal frame */}
        <div className="rounded-[50px] overflow-hidden bg-[#e75643] relative">
          <Notch />

          {/* Status bar */}
          <div className="h-8 text-white bg-black/25 w-full pt-1">
            <StatusBar />
          </div>

          {/* Main screen */}
          <div
            className="relative bg-transparent h-[680px] overflow-auto scroll"
            style={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {children}
          </div>

          {/* Bottom nav */}
          <div>
            <HomeIndicator />
          </div>
        </div>
      </div>
    </div>
  )
}
