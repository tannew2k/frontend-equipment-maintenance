import api from '@/config/api'
import type { AxiosRequestConfig } from 'axios'

class ApiService {
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await api.get<T>(url, config)
    return res.data
  }

  protected async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const res = await api.post<T>(url, data, config)
    return res.data
  }

  protected async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const res = await api.put<T>(url, data, config)
    return res.data
  }

  protected async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const res = await api.patch<T>(url, data, config)
    return res.data
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await api.delete<T>(url, config)
    return res.data
  }
}

export default ApiService
