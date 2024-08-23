import { Player } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

interface NewPlayer {
  playerName: string
}

const useCreatePlayer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (player: NewPlayer) => {
      return await axios.post("/api/players", player)
    },
    onMutate: async (newPlayer) => {
      await queryClient.cancelQueries({ queryKey: ["players"] })

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Player[]>(["players"])

      // Optimistically update to the new value
      queryClient.setQueryData<Player[]>(["players"], (old = []) => [
        ...old,
        {
          id: Math.random().toString(),
          name: newPlayer.playerName,
          createdAt: new Date(),
          updatedAt: new Date(),
          gameId: Math.random().toString(),
          questionValue: 0,
        },
      ])

      // Return a context object with the snapshotted value
      return { previousTodos }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] })
    },
  })
}

export default useCreatePlayer
