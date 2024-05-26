import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const UseGetCard = (type: string) => {
  return useQuery({
    queryKey: ["card"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/v1/game/draw/?typ=${type}`);
      return data;
    },
  });
};
