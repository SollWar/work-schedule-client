export default async function fetchTyped<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const fetchOptions: RequestInit = {
    ...options,
    credentials: 'include',
  }

  const res = await fetch(url, fetchOptions)

  if (!res.ok) throw new Error('Ошибка запроса')

  return res.json() as Promise<T>
}
