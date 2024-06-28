import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UseGetPlayers = () => {
  return useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const { data } = await axios.get("/api/players");
      return data;
    },
  });
};

export default UseGetPlayers;