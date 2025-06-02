'use client'
import { useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { getContrastTextColor } from '@/app/utils/colorsUtils'

interface ColorPickerDialogProps {
  selectColor: (color: string) => void
  userName: string
  initColor: string
  onClose: () => void
}

const ColorPickerDialog = ({
  userName,
  selectColor,
  initColor,
  onClose,
}: ColorPickerDialogProps) => {
  const [color, setColor] = useState(initColor)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    setUpdate(false)
  }, [initColor])

  return (
    <div>
      <HexColorPicker
        style={{
          width: 'auto',
        }}
        color={color}
        onChange={setColor}
      />
      <div className="grid grid-cols-[1fr_40px] gap-2 mt-2">
        <div
          className="w-full p-2 rounded-[6px] text-center"
          style={{
            color: getContrastTextColor(color),
            backgroundColor: color,
          }}
        >
          {userName}
        </div>
        <div
          className=" aspect-square p-2 rounded-[6px] text-center"
          style={{
            color: getContrastTextColor(color),
            backgroundColor: color,
          }}
        >
          27
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full mx-auto my-1">
        <button
          onClick={onClose}
          className="flex bg-[#EF4444] text-white items-center justify-center text-xl p-1.5 rounded-[6px]"
        >
          Отмена
        </button>
        <button
          onClick={() => {
            if (color != initColor) {
              selectColor(color)
              setUpdate(true)
            }
          }}
          className="flex bg-[#12C739] text-white items-center justify-center text-xl p-1.5 rounded-[6px]"
        >
          Сохранить
        </button>
      </div>
    </div>
  )
}

export default ColorPickerDialog
