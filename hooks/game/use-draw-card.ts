import axiosClient from '@/lib/api-client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useDrawCard = () => {
  return useMutation({
    mutationKey: ['card'],
    mutationFn: async ({
      type,
      playerId,
    }: {
      type: string
      playerId: string
    }) => {
      const { data, status } = await axiosClient.get(
        `/api/game/draw?type=${type}&playerId=${playerId}`
      )
      return { data, status }
    },
  })
}
