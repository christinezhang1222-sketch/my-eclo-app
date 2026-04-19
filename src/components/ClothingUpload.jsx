import { useState, useEffect } from 'react'

const ClothingUpload = ({ isOpen, onClose, onSave, categories, editingClothing, currentCategory }) => {
  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const [category, setCategory] = useState(currentCategory || 'tops')
  const [subcategory, setSubcategory] = useState('T恤')
  const [season, setSeason] = useState('四季')
  const [thickness, setThickness] = useState('薄')
  const [color, setColor] = useState('白色')
  const [price, setPrice] = useState('')
  const [frequency, setFrequency] = useState('偶尔')

  // 当编辑的衣物变化时，更新表单数据
  useEffect(() => {
    if (editingClothing) {
      setImage(editingClothing.image)
      setName(editingClothing.name)
      setCategory(editingClothing.category)
      setSubcategory(editingClothing.subcategory)
      setSeason(editingClothing.season)
      setThickness(editingClothing.thickness)
      setColor(editingClothing.color)
      setPrice(editingClothing.price?.toString() || '')
      setFrequency(editingClothing.frequency)
    } else {
      // 重置表单
      setImage(null)
      setName('')
      setCategory(currentCategory || 'tops')
      setSubcategory('T恤')
      setSeason('四季')
      setThickness('薄')
      setColor('白色')
      setPrice('')
      setFrequency('偶尔')
    }
  }, [editingClothing, currentCategory])

  // 当当前分类变化时，更新分类和子分类
  useEffect(() => {
    if (currentCategory && !editingClothing) {
      setCategory(currentCategory)
      const currentCat = categories.find(cat => cat.value === currentCategory)
      if (currentCat?.subcategories?.length > 0) {
        setSubcategory(currentCat.subcategories[0])
      }
    }
  }, [currentCategory, categories, editingClothing])

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const clothingData = {
      id: editingClothing ? editingClothing.id : Date.now(),
      name,
      image,
      category,
      subcategory,
      season,
      thickness,
      color,
      price: parseFloat(price) || 0,
      frequency,
    }
    onSave(clothingData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto mx-4">
        <div className="p-4 border-b border-light flex justify-between items-center">
          <h2 className="text-lg font-medium text-dark">{editingClothing ? '编辑衣物' : '添加衣物'}</h2>
          <button onClick={onClose} className="text-muted">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          {/* 图片上传 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-dark mb-2">图片</label>
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 bg-secondary rounded-lg flex items-center justify-center mb-2">
                {image ? (
                  <img src={image} alt="预览" className="w-full h-full object-cover rounded" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="flex space-x-2">
                <button 
                  type="button" 
                  className="px-4 py-2 bg-secondary rounded text-sm"
                  onClick={() => document.getElementById('camera').click()}
                >
                  拍照
                </button>
                <input 
                  type="file" 
                  id="camera" 
                  accept="image/*" 
                  capture="camera" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
                <button 
                  type="button" 
                  className="px-4 py-2 bg-secondary rounded text-sm"
                  onClick={() => document.getElementById('gallery').click()}
                >
                  从相册选择
                </button>
                <input 
                  type="file" 
                  id="gallery" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          {/* 基本信息 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-dark mb-2">名称</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-3 py-2 border border-light rounded-md bg-accent text-dark"
              required
            />
          </div>

          <div className="mb-4">
            <div className="relative">
              <label className="block text-sm font-medium text-dark mb-2">子分类</label>
              <select 
                value={subcategory} 
                onChange={(e) => setSubcategory(e.target.value)} 
                className="w-full px-3 py-2 border border-light rounded-md bg-accent text-dark pr-8 appearance-none"
              >
                {categories && categories.find(cat => cat.value === category)?.subcategories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <div className="absolute right-3 top-10 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <label className="block text-sm font-medium text-dark mb-2">季节</label>
              <select 
                value={season} 
                onChange={(e) => setSeason(e.target.value)} 
                className="w-full px-3 py-2 border border-light rounded-md bg-accent text-dark pr-8 appearance-none"
              >
                <option value="四季">四季</option>
                <option value="春">春</option>
                <option value="夏">夏</option>
                <option value="秋">秋</option>
                <option value="冬">冬</option>
              </select>
              <div className="absolute right-3 top-10 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-dark mb-2">厚度</label>
              <select 
                value={thickness} 
                onChange={(e) => setThickness(e.target.value)} 
                className="w-full px-3 py-2 border border-light rounded-md bg-accent text-dark pr-8 appearance-none"
              >
                <option value="薄">薄</option>
                <option value="中">中</option>
                <option value="厚">厚</option>
              </select>
              <div className="absolute right-3 top-10 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-dark mb-2">颜色</label>
              <select 
                value={color} 
                onChange={(e) => setColor(e.target.value)} 
                className="w-full px-3 py-2 border border-light rounded-md bg-accent text-dark pr-8 appearance-none"
              >
                <option value="白色">白色</option>
                <option value="黑色">黑色</option>
                <option value="灰色">灰色</option>
                <option value="蓝色">蓝色</option>
                <option value="红色">红色</option>
                <option value="绿色">绿色</option>
                <option value="黄色">黄色</option>
                <option value="紫色">紫色</option>
                <option value="橙色">橙色</option>
                <option value="其他">其他</option>
              </select>
              <div className="absolute right-3 top-10 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">购买价格</label>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                className="w-full px-3 py-2 border border-light rounded-md bg-accent text-dark"
                step="0.01"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-dark mb-2">穿着频率</label>
              <select 
                value={frequency} 
                onChange={(e) => setFrequency(e.target.value)} 
                className="w-full px-3 py-2 border border-light rounded-md bg-accent text-dark pr-8 appearance-none"
              >
                <option value="经常">经常</option>
                <option value="偶尔">偶尔</option>
                <option value="很少">很少</option>
              </select>
              <div className="absolute right-3 top-10 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
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

export default ClothingUpload