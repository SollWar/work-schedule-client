import { mainStore } from '../stores/mainStore'

export const fetchTyped = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const authString = mainStore.getState().authString

  const headers = {
    ...(options.headers || {}),
    Authorization: authString,
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
  }

  const res = await fetch(url, fetchOptions)

  if (!res.ok) throw new Error('Ошибка запроса')

  return res.json() as Promise<T>
}

export const fetchWithAuth = <T>(url: string, options: RequestInit = {}) =>
  fetchTyped<T>(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: mainStore.getState().authString,
    },
  })
