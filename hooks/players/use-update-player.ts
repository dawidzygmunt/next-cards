import axiosClient from "@/lib/api-client"
import { Player } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const usePatchPlayer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["players"],
    mutationFn: async (player: Player) => {
      return await axiosClient.patch(`/api/players/${player.id}`, player)
    },
    onMutate: async (player) => {
      await queryClient.cancelQueries({ queryKey: ["players"] })
      const previousPlayers = queryClient.getQueryData<Player[]>(["players"])
      queryClient.setQueryData<Player[]>(["players"], (old) => [
        ...(old || []),
        player,
      ])
      return { previousPlayers }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] })
    },
  })
}

export default usePatchPlayer
