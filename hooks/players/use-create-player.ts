import axiosClient from '@/lib/api-client'
import { Player } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

interface NewPlayer {
  playerName: string
  gender: 'M' | 'F' | null
}

const useCreatePlayer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (player: NewPlayer) => {
      return await axiosClient.post('/api/players', player)
    },
  })
}

export default useCreatePlayer
