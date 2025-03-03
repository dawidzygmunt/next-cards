'use client'

import continueGame from '@/actions/game/continue-game'
import { IPhoneFrame } from '@/components/iphone-frame'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import { Button } from '@/components/ui/button'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const MainMenu = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const newGame = async () => {
    queryClient.invalidateQueries({ queryKey: ['players'] })
    router.push('/newGame')
  }

  const handleContinue = async () => {
    const result = await continueGame()
    if ('error' in result) {
      toast.error(result.error)
      return
    }
    router.push('/game')
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        {/* <BackgroundGradientAnimation> */}
        <IPhoneFrame>
          <div className="absolute inset-0 items-center justify-center text-white font-bold px-4 text-5xl text-center lg:text-7xl flex flex-col">
            <h2 className="font-bold text-6xl">
              Karty
              <span className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-black/80 to-white/20">
                Party
              </span>
            </h2>

            <div className="flex flex-col text-2xl gap-2 py-24 items-center">
              <Button
                className="w-[260px] sm:w-[300px] py-6  rounded-3xl border-2 border-gray-500 hover:border-white transition-all duration-300"
                onClick={newGame}
              >
                Nowa gra
              </Button>

              <Button
                className="w-[260px] sm:w-[300px] py-6  rounded-3xl border-2 border-gray-500 hover:border-white transition-all duration-300"
                onClick={handleContinue}
              >
                Kontynuj
              </Button>

              <Link href="/admin/dashboard">
                <Button className="w-[260px] sm:w-[300px] py-6  rounded-3xl border-2 border-gray-500 hover:border-white transition-all duration-300">
                  Panel zarządzania
                </Button>
              </Link>

              <Link href="/report-bug">
                <Button className="w-[260px] sm:w-[300px] py-6  rounded-3xl border-2 border-gray-500 hover:border-white transition-all duration-300">
                  Zgłoś błąd
                </Button>
              </Link>
            </div>
          </div>
        </IPhoneFrame>
        {/* </BackgroundGradientAnimation> */}
      </div>

      <div className="absolute inset-0 items-center justify-center text-white font-bold px-4 text-5xl text-center lg:text-7xl flex flex-col sm:hidden">
        <h2 className="font-bold text-6xl">
          Karty
          <span className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-black/80 to-white/20">
            Party
          </span>
        </h2>

        <div className="flex flex-col text-2xl gap-2 py-24 items-center">
          <Button
            className="w-[260px] sm:w-[300px] py-6  rounded-3xl border-2 border-gray-500 hover:border-white transition-all duration-300"
            onClick={newGame}
          >
            Nowa gra
          </Button>

          <Button
            className="w-[260px] sm:w-[300px] py-6  rounded-3xl border-2 border-gray-500 hover:border-white transition-all duration-300"
            onClick={handleContinue}
          >
            Kontynuj
          </Button>

          <Link href="/admin/dashboard">
            <Button className="w-[260px] sm:w-[300px] py-6  rounded-3xl border-2 border-gray-500 hover:border-white transition-all duration-300">
              Panel zarządzania
            </Button>
          </Link>

          <Link href="/report-bug">
            <Button className="w-[260px] sm:w-[300px] py-6  rounded-3xl border-2 border-gray-500 hover:border-white transition-all duration-300">
              Zgłoś błąd
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default MainMenu
