"use client"

import axiosClient from "@/lib/api-client"
import axios from "axios"
import { VeganIcon } from "lucide-react"

import { useRouter } from "next/navigation"
import React from "react"

const CollectionCard = ({
  name,
  collectionId,
}: {
  name: string
  collectionId: string
}) => {
  const router = useRouter()

  const handleClick = async () => {
    await axiosClient.post("/api/game", {
      collectionId,
    })
    router.push(`/newGame/${collectionId}`)
  }

  return (
    <div
      className="p-4 min-h-[200px] min-w-[150px] text-center bg-slate-300 rounded-lg border border-gray-500 flex 
      flex-col items-center gap-10 hover:bg-gray-700 transition-all hover:text-white duration-300 hover:cursor-pointer"
      onClick={handleClick}
    >
      <h1 className="font-bold text-2xl">{name}</h1>
      <VeganIcon size={50} className="text-green-500" />
    </div>
  )
}

export default CollectionCard
