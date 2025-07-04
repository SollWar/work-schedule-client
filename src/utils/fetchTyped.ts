export default async function fetchTyped<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = {
    ...(options.headers || {}),
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
  }

  const res = await fetch(url, fetchOptions)

  if (!res.ok) throw new Error('Ошибка запроса')

  return res.json() as Promise<T>
}
