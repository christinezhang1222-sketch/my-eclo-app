import { useState } from 'react'

const CreateOutfit = ({ isOpen, onClose, onSave, clothingItems }) => {
  const [name, setName] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [showToast, setShowToast] = useState(false)

  const handleItemToggle = (item) => {
    if (selectedItems.some(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedItems.length === 0) {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
      return
    }
    const newOutfit = {
      id: Date.now(),
      name: name || `穿搭方案${Date.now()}`,
      items: selectedItems,
    }
    onSave(newOutfit)
    onClose()
    setName('')
    setSelectedItems([])
  }

  const handleClose = () => {
    onClose()
    setName('')
    setSelectedItems([])
    setShowToast(false)
  }

  // 分类名称映射
  const categoryNames = {
    tops: '上衣',
    bottoms: '下装',
    dresses: '连衣裙',
    accessories: '饰品',
    shoes: '鞋子',
  }

  // 按分类分组衣物
  const groupedClothing = clothingItems.reduce((acc, item) => {
    const category = item.category || '其他'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(item)
    return acc
  }, {})

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto mx-4">
        <div className="p-4 border-b border-light flex justify-between items-center">
          <h2 className="text-lg font-medium text-dark">创建穿搭</h2>
          <button onClick={handleClose} className="text-muted">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-dark mb-2">穿搭名称</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-3 py-2 border border-light rounded-md bg-accent text-dark"
              placeholder="输入穿搭名称"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-dark mb-2">选择衣物</label>
            
            {/* 按分类展示 */}
            {Object.entries(groupedClothing).map(([category, items]) => (
              <div key={category} className="mb-4">
                <h3 className="text-sm font-medium text-dark mb-2">{categoryNames[category] || category}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className={`relative rounded-lg overflow-hidden border-2 ${selectedItems.some(i => i.id === item.id) ? 'border-primary' : 'border-light'}`}
                      onClick={() => handleItemToggle(item)}
                    >
                      <div className="aspect-square bg-secondary flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <div className="p-1 text-center text-xs text-dark truncate">
                        {item.name}
                      </div>
                      {selectedItems.some(i => i.id === item.id) && (
                        <div className="absolute top-1 right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary text-white py-2 rounded-md font-medium"
          >
            保存穿搭
          </button>
        </form>

        {showToast && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark text-white px-6 py-3 rounded-lg shadow-lg">
            您还未选择衣物哦～
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateOutfit