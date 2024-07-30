"use client"

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { MainNav } from "./main-nav"

function SideNavbar() {
  const router = useRouter()

  return (
    <aside className="w-[220px] flex flex-col ">
      <div
        className="flex m-4 hover:cursor-pointer justify- items-center"
        onClick={() => router.push("/")}
      >
        <h2 className="font-bold text-2xl">
          Karty
          <span className="text-red-500">Party</span>
        </h2>
      </div>
      <div className="flex flex-col bg-white mx-5 rounded-xl font-bold h-[88vh] shadow-2xl justify-between sticky top-0 left-0">
        <MainNav />
        <div className="m-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </aside>
  )
}

export default SideNavbar
