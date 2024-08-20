"use client"

import continueGame from "@/actions/game/continue-game"
import createNewGame from "@/actions/game/new-game"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { error } from "console"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const MainMenu = () => {
  const router = useRouter()

  const newGame = async () => {
    router.push("/newGame")
  }

  const handleContinue = async () => {
    const result = await continueGame()
    if ("error" in result) {
      toast.error(result.error)
      return
    }
    router.push("/game")
  }

  return (
    <>
      <BackgroundGradientAnimation />
      <div className="absolute inset-0 items-center justify-center text-white font-bold px-4 text-3xl text-center md:text-4xl lg:text-7xl flex flex-col">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 mb-20">
          Prawda chodzi boso
        </p>
        <div className="flex flex-col text-2xl gap-2 p-24 py-36">
          <Button
            className="w-[300px] py-6  rounded-3xl border-2 border-gray-500 hover:border-white transition-all duration-300"
            onClick={newGame}
          >
            Nowa gra
          </Button>

          <Button
            className="w-[300px] py-6  rounded-3xl border-2 border-gray-500 hover:border-white transition-all duration-300"
            onClick={handleContinue}
          >
            Kontynuj
          </Button>

          <Link href="/admin/dashboard">
            <Button className="w-[300px] py-6  rounded-3xl border-2 border-gray-500 hover:border-white transition-all duration-300">
              Ustawienia
            </Button>
          </Link>

          <Link href="/credits">
            <Button className="w-[300px] py-6  rounded-3xl border-2 border-gray-500 hover:border-white transition-all duration-300">
              Credits
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default MainMenu
