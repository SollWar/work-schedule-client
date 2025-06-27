export default async function fetchTyped<T>(
  url: string,
  options: RequestInit = {},
  withCredentials: boolean = true
): Promise<T> {
  const fetchOptions: RequestInit = {
    ...options,
    credentials: withCredentials ? 'include' : 'omit',
  }

  const res = await fetch(url, fetchOptions)

  if (!res.ok) throw new Error('Ошибка запроса')

  return res.json() as Promise<T>
}
