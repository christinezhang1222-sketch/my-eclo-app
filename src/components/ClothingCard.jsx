import { useState, useEffect, useRef } from 'react'

const ClothingCard = ({ item, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const cardRef = useRef(null)

  const handleLongPress = () => {
    setIsEditing(true)
  }

  const handleClick = () => {
    if (!isEditing) {
      onEdit(item)
    }
  }

  useEffect(() => {
    if (isEditing) {
      const handleClickOutside = (event) => {
        if (cardRef.current && !cardRef.current.contains(event.target)) {
          setIsEditing(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('touchstart', handleClickOutside)
      }
    }
  }, [isEditing])

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-lg shadow-soft overflow-hidden transition-all duration-300 hover:shadow-medium hover:scale-[1.02] relative cursor-pointer"
      onClick={handleClick}
      onContextMenu={(e) => e.preventDefault()} // 阻止右键菜单
      onTouchStart={(e) => {
        e.preventDefault()
        handleLongPress()
      }}
      onMouseDown={(e) => {
        if (e.button === 0) { // 只处理左键
          const pressTimer = setTimeout(handleLongPress, 500)
          
          const handleMouseUp = () => {
            clearTimeout(pressTimer)
            document.removeEventListener('mouseup', handleMouseUp)
          }
          
          document.addEventListener('mouseup', handleMouseUp)
        }
      }}
    >
      <div className="aspect-square bg-light flex items-center justify-center">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
      </div>
      <div className="p-2 text-center text-xs text-dark">
        {item.name}
      </div>
      {isEditing && (
        <button 
          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
          onClick={() => {
            onDelete(item.id)
            setIsEditing(false)
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}

export default ClothingCard