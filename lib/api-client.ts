import axios from "axios"

const createAxiosInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    withCredentials: true,
  })
}

const axiosClient = createAxiosInstance(process.env.NEXT_PUBLIC_BASE_PATH || "")

export default axiosClient
