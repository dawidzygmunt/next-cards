import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Player {
  playerName: string;
}

const UsePostPlayer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["players"],
    mutationFn: async (player: Player) => {
      return await axios.post("/api/players", player);
    },
    onMutate: async (player) => {
      await queryClient.cancelQueries({ queryKey: ["players"] });
      const previousPlayers = queryClient.getQueryData(["players"]);
      queryClient.setQueryData(["players"], (old: string[]) => [
        ...old,
        player,
      ]);
      return { previousPlayers };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
};

export default UsePostPlayer;
