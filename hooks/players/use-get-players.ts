import axiosClient from '@/lib/api-client'
import { Player } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

const useGetPlayers = () => {
  const { data, status, isSuccess } = useQuery<Player[]>({
    queryKey: ['players'],
    queryFn: async () => {
      try {
        const { data } = await axiosClient.get('/api/players')
        return data
      } catch (error) {
        console.log("can't fetch players")
      }
    },
  })
  return { data, status, isSuccess }
}

export default useGetPlayers
