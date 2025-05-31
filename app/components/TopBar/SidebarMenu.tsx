import { useMainStore } from '@/app/stores/useMainStore'
import React, { useState } from 'react'

const SidebarMenu: React.FC = () => {
  const { mainData } = useMainStore()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        className="bg-amber-400 px-4 h-full flex items-center rounded-[6px]"
        onClick={() => setIsOpen(true)}
      >
        H
      </button>
      <div
        className={`fixed inset-0 bg-white transition-opacity z-40 ${
          isOpen ? 'opacity-80 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 h-full w-[80%] bg-white shadow-lg z-50 transition-all duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-14 m-1 ps-2 bg-[#F0FEDD] flex justify-between items-center">
          <h2 className="text-lg font-bold ps-3">{mainData?.user.name}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-amber-400 px-4 me-3 h-[48px] flex items-center rounded-[6px]"
          >
            X
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <a
            href="#"
            className="bg-[#2B7FFF] h-12 ps-2 text-white flex items-center rounded-[6px] focus:outline-none active:outline-none"
          >
            Главная
          </a>
          <a
            href="#"
            className="bg-[#2B7FFF] h-12 ps-2 text-white flex items-center rounded-[6px] focus:outline-none active:outline-none"
          >
            Профиль
          </a>
          <a
            href="#"
            className="bg-[#2B7FFF] h-12 ps-2 text-white flex items-center rounded-[6px] focus:outline-none active:outline-none"
          >
            Настройки
          </a>
        </nav>
      </div>
    </>
  )
}

export default SidebarMenu
