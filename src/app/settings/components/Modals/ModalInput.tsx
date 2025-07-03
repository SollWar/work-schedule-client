import React from 'react'

type ModalInputProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  closeButton: boolean
}

const ModalInput = ({
  isOpen,
  onClose,
  children,
  closeButton,
}: ModalInputProps) => {
  if (!isOpen) return null

  return (
    <div
      className={`fixed w-full h-full cursor-pointer 
        bg-[rgba(0,0,0,0.5)] flex items-center 
        justify-center z-[1000] left-0 top-0`}
      onClick={onClose}
    >
      <div
        className="relative max-w-[500px] w-[90%] p-5 bg-[#ffffff] rounded-[6px] cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      >
        {closeButton ? (
          <button
            className="absolute text-2xl border-[none] right-[15px] top-2.5 bg-[transparent] cursor-pointer"
            onClick={onClose}
          >
            ×
          </button>
        ) : (
          ''
        )}
        {children}
      </div>
    </div>
  )
}

export default ModalInput
