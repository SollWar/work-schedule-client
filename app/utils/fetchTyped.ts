export default async function fetchTyped<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, options)
  if (!res.ok) throw new Error('Ошибка запроса')
  return res.json() as Promise<T>
}
