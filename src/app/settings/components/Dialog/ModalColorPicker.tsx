'use client'
import { useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { getContrastTextColor } from '@/src/utils/colorsUtils'
import AcceptButton from '../AcceptButton'

interface ModalColorPickerProps {
  selectColor: (color: string) => void
  userName: string
  initColor: string
  onClose: () => void
}

const ModalColorPicker = ({
  userName,
  selectColor,
  initColor,
  onClose,
}: ModalColorPickerProps) => {
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
      <AcceptButton
        acceptClick={() => {
          if (color != initColor) {
            selectColor(color)
            setUpdate(true)
          }
        }}
        cancelClick={onClose}
        topStyle={'grid grid-cols-2 gap-2 w-full mx-auto my-1 h-[40px]'}
        disabled={update}
        height={'40px'}
      />
    </div>
  )
}

export default ModalColorPicker
