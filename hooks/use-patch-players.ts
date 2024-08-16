import { Player } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const UsePatchPlayer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["players"],
    mutationFn: async (player: Player) => {
      return await axios.patch(`/api/v1/players/${player.id}`, player)
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
