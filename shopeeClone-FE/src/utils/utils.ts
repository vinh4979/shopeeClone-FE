import axios, { AxiosError } from 'axios'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isUnprocessableEntityError<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === 422
}

// thực hiện đăng kí, nếu email đã tồn tại thì server response về AxiosError (trong trả về đó có chưa các respone, data ....)
// đó đó ta setup function isAxiosError theo giá trị trả về là một AxiosError như server trả về
// error nhận vào ban đầu là kểu unkown, sau đó ép kiểu về thành AxiosError
