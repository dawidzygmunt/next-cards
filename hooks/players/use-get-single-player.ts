import axiosClient from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const useGetSinglePlayer = (id: string) => {
  return useQuery({
    queryKey: ["player", id],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/api/players/${id}`)
      return data
    },
  })
}

export default useGetSinglePlayer
