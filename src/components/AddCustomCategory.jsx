import { useState } from 'react'

const AddCustomCategory = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('')
  const [subcategories, setSubcategories] = useState([''])

  const handleAddSubcategory = () => {
    setSubcategories([...subcategories, ''])
  }

  const handleRemoveSubcategory = (index) => {
    if (subcategories.length > 1) {
      setSubcategories(subcategories.filter((_, i) => i !== index))
    }
  }

  const handleSubcategoryChange = (index, value) => {
    const newSubcategories = [...subcategories]
    newSubcategories[index] = value
    setSubcategories(newSubcategories)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    
    const customCategory = {
      name: name.trim(),
      value: name.trim().toLowerCase().replace(/\s+/g, '_'),
      subcategories: subcategories.filter(sub => sub.trim()),
      isCustom: true
    }
    
    onSave(customCategory)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">添加自定义分类</h2>
          <button onClick={onClose} className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">分类名称</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="例如：包包"
              required
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">子分类</label>
              <button 
                type="button" 
                className="text-sm text-primary"
                onClick={handleAddSubcategory}
              >
                + 添加
              </button>
            </div>
            {subcategories.map((subcategory, index) => (
              <div key={index} className="flex items-center mb-2">
                <input 
                  type="text" 
                  value={subcategory} 
                  onChange={(e) => handleSubcategoryChange(index, e.target.value)} 
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md mr-2"
                  placeholder="例如：双肩包"
                />
                {subcategories.length > 1 && (
                  <button 
                    type="button" 
                    className="text-gray-500"
                    onClick={() => handleRemoveSubcategory(index)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary text-white py-2 rounded-md font-medium"
          >
            保存
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddCustomCategory