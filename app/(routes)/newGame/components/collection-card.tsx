'use client'

import { Button } from '@/components/ui/button'
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
    <Button
      className="text-2xl p-7 bg-[#0a0a1d] rounded-2xl"
      onClick={handleClick}
    >
      {name}
    </Button>
  )
}

export default CollectionCard
