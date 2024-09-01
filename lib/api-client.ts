import axios from "axios"

const createAxiosInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    withCredentials: true,
  })
}

const axiosClient = createAxiosInstance(
  `http://localhost:3000/${process.env.NEXT_PUBLIC_BASE_PATH}` ||
    "http://localhost:3000"
)

export default axiosClient
