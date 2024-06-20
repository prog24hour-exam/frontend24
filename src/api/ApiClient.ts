import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class ApiClient<T = any> {
  private axiosInstance: AxiosInstance

  constructor(token: string | null = null) {
    const baseURL = import.meta.env.VITE_DEV_API_BASE_URL
    if (!baseURL) {
      throw new Error('API base URL not defined in environment variables')
    }

    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    })
  }

  public async get<R = T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.axiosInstance.get(endpoint, config).then(this.handleResponse)
  }

  public async post<R = T>(
    endpoint: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.axiosInstance
      .post(endpoint, data, config)
      .then(this.handleResponse)
  }

  public async put<R = T>(
    endpoint: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.axiosInstance
      .put(endpoint, data, config)
      .then(this.handleResponse)
  }

  public async delete<R = T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.axiosInstance.delete(endpoint, config).then(this.handleResponse)
  }

  private handleResponse<R>(response: AxiosResponse<R>): R {
    return response.data
  }
}
