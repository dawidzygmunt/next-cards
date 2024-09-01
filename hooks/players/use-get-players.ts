import axiosClient from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"

const useGetPlayers = () => {
  return useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/api/players")
      return data
    },
  })
}

export default useGetPlayers
