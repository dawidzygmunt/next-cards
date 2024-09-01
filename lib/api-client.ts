import axios from "axios"

const createAxiosInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    withCredentials: true,
  })
}

const axiosClient = createAxiosInstance(
  process.env.BASE_PATH || "http://localhost:3000"
)

export default axiosClient
