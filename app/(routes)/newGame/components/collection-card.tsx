'use client'

import axiosClient from '@/lib/api-client'

import { useRouter } from 'next/navigation'
import React from 'react'

const CollectionCard = ({
  name,
  collectionId,
}: {
  name: string
  collectionId: string
}) => {
  const router = useRouter()

  const handleClick = async () => {
    try {
      await axiosClient.post('/api/game', {
        collectionId,
      })
      router.push(`/newGame/${collectionId}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className="p-3 bg-[#1b1b20] rounded-2xl"
      onClick={handleClick}
    >
      <h1 className="font-bold text-xl text-white">{name}</h1>
    </div>
  )
}

export default CollectionCard
