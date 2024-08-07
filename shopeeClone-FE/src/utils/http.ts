import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.response.use(
      function (response) {
        return response
      },
      function (error: AxiosError) {
        // console.log('aixos error:', error)
        // nếu như không phải là lỗi 422 thì show message từ server tra về
        if (error.response?.status !== 422) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data

          const message = data.message || error.message

          toast.error(message, {
            position: 'top-right'
          })
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
