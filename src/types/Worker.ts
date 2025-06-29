export interface Worker {
  id: string
  name: string
  color: string
  access_id: number
  editable?: number
}

export interface TelegramAuth {
  telegram_id: string
}
