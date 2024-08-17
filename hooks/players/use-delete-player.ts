import { Player } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const useDeletePlayer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["players"],
    mutationFn: async (playerId: string) => {
      return await axios.delete(`/api/players/${playerId}`)
    },
    onMutate: async (playerId: string) => {
      await queryClient.cancelQueries({ queryKey: ["players"] })
      const previousPlayers = queryClient.getQueryData<Player[]>(["players"])
      queryClient.setQueryData<Player[]>(["players"], (old) =>
        old ? old.filter((player) => player.id !== playerId) : []
      )
      return { previousPlayers }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] })
    },
  })
}

export default useDeletePlayer
