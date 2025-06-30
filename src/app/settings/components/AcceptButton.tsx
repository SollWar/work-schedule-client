import clsx from 'clsx'

interface AcceptButtonProps {
  acceptClick: () => void
  cancelClick: () => void
  disabled: boolean
  topStyle: string
  height: string
}

const AcceptButton = ({
  acceptClick,
  cancelClick,
  disabled,
  topStyle,
  height,
}: AcceptButtonProps) => {
  return (
    <div className={topStyle}>
      <button
        onClick={cancelClick}
        disabled={disabled}
        className={clsx(
          'flex items-center justify-center text-xl rounded-[6px]',
          `h-[${height}]`,
          disabled ? 'bg-gray-500' : 'bg-transparent',
          disabled ? 'text-white' : 'text-black',
          disabled ? 'border-0' : 'border-1'
        )}
      >
        Отмена
      </button>
      <button
        onClick={acceptClick}
        className={clsx(
          'flex items-center justify-center text-xl rounded-[6px] text-white',
          `h-[${height}]`,
          disabled ? 'bg-gray-500' : 'bg-[#2B7FFF]'
        )}
        disabled={disabled}
      >
        Сохранить
      </button>
    </div>
  )
}

export default AcceptButton
