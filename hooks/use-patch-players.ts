import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Player } from "types";

export const UsePatchPlayer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["players"],
    mutationFn: async (player: Player) => {
      return await axios.patch(`/api/v1/players/${player._id}`, player);
    },
    onMutate: async (player) => {
      await queryClient.cancelQueries({ queryKey: ["players"] });
      const previousPlayers = queryClient.getQueryData(["players"]);
      queryClient.setQueryData(["players"], (old: string) => [...old, player]);
      return { previousPlayers };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
};
