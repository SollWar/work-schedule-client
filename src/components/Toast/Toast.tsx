import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { useToastStore } from '@/src/stores/toastStore'

export const Toast = () => {
  const { message, show } = useToastStore()
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let toastRoot = document.getElementById('dynamic-toast-root')
    if (!toastRoot) {
      toastRoot = document.createElement('div')
      toastRoot.id = 'dynamic-toast-root'
      document.body.appendChild(toastRoot)
    }
    setContainer(toastRoot)
  }, [])

  if (!container || !message) return null

  return createPortal(
    <div
      className={clsx(
        'fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-center',
        'transition-all duration-300 ease-in-out',
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        'bg-[#2B7FFF] text-white px-4 py-2 rounded-md shadow-lg'
      )}
    >
      {message}
    </div>,
    container
  )
}
