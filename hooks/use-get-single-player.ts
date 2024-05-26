import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UseGetPlayers = () => {
  return useQuery({
    queryKey: ["players"],
    queryFn: async (id) => {
      const { data } = await axios.get(`/api/v1/players/${id}`);
      return data;
    },
  });
};

export default UseGetPlayers;
