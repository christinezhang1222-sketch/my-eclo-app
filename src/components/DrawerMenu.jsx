import { useState } from 'react'

const DrawerMenu = ({ isOpen, onClose, onSelectCategory, onAddCustomCategory, onDeleteCategory, categories }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 animate-fade-in">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-medium animate-slide-in">
        <div className="p-4 border-b border-light">
          <h2 className="text-lg font-medium text-dark">分类</h2>
        </div>
        <div className="py-2">
          {categories.map((category) => (
            <div
              key={category.value}
              className="flex items-center justify-between px-4 py-3 hover:bg-light transition-colors duration-200"
            >
              <button
                className="flex-1 text-left"
                onClick={() => {
                  onSelectCategory(category)
                  onClose()
                }}
              >
                {category.name}
              </button>
              {category.isCustom && (
                <button
                  className="ml-2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    setDeleteConfirm(category)
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            className="w-full text-left px-4 py-3 hover:bg-light transition-colors duration-200 text-primary"
            onClick={() => {
              onAddCustomCategory()
              onClose()
            }}
          >
            + 添加自定义分类
          </button>
        </div>
      </div>

      {/* 删除确认弹窗 */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-xs p-4 mx-4">
            <h3 className="text-base font-medium text-center mb-4">确认删除"{deleteConfirm.name}"分类吗？</h3>
            <div className="flex space-x-3">
              <button
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600"
                onClick={() => setDeleteConfirm(null)}
              >
                取消
              </button>
              <button
                className="flex-1 px-3 py-2 bg-red-500 text-white rounded-md text-sm"
                onClick={() => {
                  onDeleteCategory(deleteConfirm.value)
                  setDeleteConfirm(null)
                }}
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DrawerMenu