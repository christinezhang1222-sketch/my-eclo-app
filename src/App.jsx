import { useState, useEffect } from 'react'
import DrawerMenu from './components/DrawerMenu'
import BottomNav from './components/BottomNav'
import ClothingCard from './components/ClothingCard'
import OutfitCard from './components/OutfitCard'
import ClothingUpload from './components/ClothingUpload'
import CreateOutfit from './components/CreateOutfit'
import Statistics from './components/Statistics'
import Guide from './components/StepGuide'
import AddCustomCategory from './components/AddCustomCategory'
import { getCurrentWeather } from './services/weatherService'

function App() {
  const [activeTab, setActiveTab] = useState('closet')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isCreateOutfitOpen, setIsCreateOutfitOpen] = useState(false)
  const [isAddCustomCategoryOpen, setIsAddCustomCategoryOpen] = useState(false)
  const [isEditingSubcategories, setIsEditingSubcategories] = useState(false)
  const [customSubcategoryName, setCustomSubcategoryName] = useState('')
  const [editingClothing, setEditingClothing] = useState(null)
  const [clothingItems, setClothingItems] = useState([
    {
      id: 1,
      name: '白色T恤',
      category: 'tops',
      subcategory: 'T恤',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=white%20t-shirt%20on%20white%20background&image_size=square',
      seasons: ['春', '夏', '秋'],
      thickness: '薄',
      color: '白色',
      price: 99,
      wearFrequency: '经常',
      status: '可穿'
    },
    {
      id: 2,
      name: '蓝色牛仔裤',
      category: 'bottoms',
      subcategory: '牛仔裤',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20jeans%20on%20white%20background&image_size=square',
      seasons: ['春', '秋', '冬'],
      thickness: '中',
      color: '蓝色',
      price: 199,
      wearFrequency: '偶尔',
      status: '可穿'
    }
  ])
  const [outfits, setOutfits] = useState([])
  const [showGuide, setShowGuide] = useState(true)
  const [categories, setCategories] = useState([
    { name: '上衣', value: 'tops', subcategories: ['T恤', '衬衫', '卫衣', '外套', '针织/毛衣', '吊带'] },
    { name: '下装', value: 'bottoms', subcategories: ['牛仔裤', '休闲裤', '短裤', '裙子', '裤袜'] },
    { name: '连衣裙', value: 'dresses', subcategories: ['长裙', '短裙'] },
    { name: '饰品', value: 'accessories', subcategories: ['帽子', '围巾', '耳钉/耳环', '墨镜/眼镜', '发饰', '项链', '其他'] },
    { name: '鞋子', value: 'shoes', subcategories: ['运动鞋', '皮鞋', '靴子', '雪地靴/棉鞋', '单鞋', '凉鞋'] },
  ])
  const [showCategoryHome, setShowCategoryHome] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState({
    name: '上衣',
    value: 'tops',
    subcategories: ['T恤', '衬衫', '卫衣', '外套', '针织/毛衣', '吊带'],
  })
  const [selectedSubcategory, setSelectedSubcategory] = useState('T恤')
  const [weather, setWeather] = useState(null)

  // 获取天气数据
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getCurrentWeather()
        setWeather(data)
      } catch (error) {
        console.error('获取天气失败:', error)
      }
    }
    fetchWeather()
  }, [])

  const handleSelectCategory = (category) => {
    setSelectedCategory(category)
    if (category.subcategories.length > 0) {
      setSelectedSubcategory(category.subcategories[0])
    }
    setShowCategoryHome(false)
  }

  const handleSaveClothing = (clothingData) => {
    if (editingClothing) {
      // 编辑现有衣物
      setClothingItems(clothingItems.map(item => 
        item.id === editingClothing.id ? { ...item, ...clothingData } : item
      ))
      setEditingClothing(null)
    } else {
      // 添加新衣物
      setClothingItems([...clothingItems, clothingData])
    }
  }

  const handleSaveOutfit = (newOutfit) => {
    setOutfits([...outfits, newOutfit])
  }

  const handleAddCustomCategory = () => {
    setIsAddCustomCategoryOpen(true)
  }

  const handleSaveCustomCategory = (customCategory) => {
    setCategories([...categories, customCategory])
  }

  const handleDeleteCategory = (categoryValue) => {
    setCategories(categories.filter(cat => cat.value !== categoryValue))
    if (selectedCategory.value === categoryValue) {
      setSelectedCategory(categories.find(cat => cat.value !== categoryValue) || categories[0])
    }
  }

  const handleEditSubcategories = () => {
    setIsEditingSubcategories(true)
    setCustomSubcategoryName('')
  }

  const handleAddSubcategory = () => {
    if (!customSubcategoryName.trim()) return
    
    const updatedCategories = categories.map(cat => {
      if (cat.value === selectedCategory.value) {
        return {
          ...cat,
          subcategories: [...cat.subcategories, customSubcategoryName.trim()]
        }
      }
      return cat
    })
    
    setCategories(updatedCategories)
    
    const updatedCategory = updatedCategories.find(cat => cat.value === selectedCategory.value)
    setSelectedCategory(prev => ({
      ...prev,
      subcategories: updatedCategory ? updatedCategory.subcategories : prev.subcategories
    }))
    
    setCustomSubcategoryName('')
  }

  const handleDeleteSubcategory = (subcategoryToDelete) => {
    const updatedCategories = categories.map(cat => {
      if (cat.value === selectedCategory.value) {
        return {
          ...cat,
          subcategories: cat.subcategories.filter(sub => sub !== subcategoryToDelete)
        }
      }
      return cat
    })
    
    const updatedCategory = updatedCategories.find(cat => cat.value === selectedCategory.value)
    setCategories(updatedCategories)
    setSelectedCategory(prev => ({
      ...prev,
      subcategories: updatedCategory ? updatedCategory.subcategories : prev.subcategories
    }))
    
    if (selectedSubcategory === subcategoryToDelete) {
      setSelectedSubcategory('')
    }
  }

  const handleFinishEditing = () => {
    setIsEditingSubcategories(false)
    setCustomSubcategoryName('')
  }

  const handleDeleteClothing = (clothingId) => {
    setClothingItems(clothingItems.filter(item => item.id !== clothingId))
  }

  const handleEditClothing = (clothing) => {
    setEditingClothing(clothing)
    setIsUploadOpen(true)
  }

  // 过滤当前分类的衣物
  const filteredClothing = clothingItems.filter(item => 
    item.category === selectedCategory.value && 
    (selectedSubcategory ? item.subcategory === selectedSubcategory : true)
  )

  return (
    <div className="min-h-screen bg-accent">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            className="text-gray-600"
            onClick={() => setIsDrawerOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <h1 className="text-lg font-medium" style={{ color: '#7BC2E8' }}>ECLO 电子衣柜</h1>
          <div className="w-6"></div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="flex-1 pb-20">
        {activeTab === 'closet' && (
          <div className="p-4">
            {showCategoryHome ? (
              <>
                <h2 className="text-xl font-medium mb-4 text-dark">我的衣柜</h2>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.value} className="bg-light rounded-lg p-4 cursor-pointer flex flex-col" onClick={() => handleSelectCategory(category)} style={{ minHeight: '150px' }}>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">{category.name}</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {clothingItems
                          .filter(item => item.category === category.value)
                          .slice(0, 5)
                          .map((item, index) => (
                            <div key={item.id} className="border border-gray-300 rounded-md overflow-hidden flex-shrink-0" style={{ width: '80px', height: '80px' }}>
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        {clothingItems.filter(item => item.category === category.value).length === 0 && (
                          <div className="border border-dashed border-gray-300 rounded-md flex-shrink-0 flex items-center justify-center" style={{ width: '80px', height: '80px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center mb-4">
                  <button 
                    className="mr-3 text-gray-600"
                    onClick={() => setShowCategoryHome(true)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-xl font-medium text-dark">{selectedCategory.name}</h2>
                </div>
                {/* 二级分类Tab */}
                {selectedCategory.subcategories.length > 0 && (
                  <div className="mb-4 pb-2">
                    {isEditingSubcategories ? (
                      <div className="flex flex-wrap">
                        {selectedCategory.subcategories.map((subcategory, index) => (
                          <div key={index} className="flex items-center mb-2 mr-2">
                            <span className="px-4 py-2 rounded-full text-sm bg-light">{subcategory}</span>
                            <button 
                              className="ml-1 w-6 h-6 flex items-center justify-center text-red-500"
                              onClick={() => handleDeleteSubcategory(subcategory)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <div className="flex items-center mb-2">
                          <input 
                            type="text"
                            value={customSubcategoryName}
                            onChange={(e) => setCustomSubcategoryName(e.target.value)}
                            className="px-3 py-2 rounded-full text-sm border border-primary w-28"
                            placeholder="新分类"
                          />
                          <button 
                            className="ml-1 px-3 py-2 rounded-full text-sm bg-primary text-white"
                            onClick={handleAddSubcategory}
                          >
                            添加
                          </button>
                          <button 
                            className="ml-2 px-3 py-2 rounded-full text-sm text-primary"
                            onClick={handleFinishEditing}
                          >
                            完成
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                        {selectedCategory.subcategories.map((subcategory, index) => (
                          <button 
                            key={index} 
                            className={`px-4 py-2 mr-2 rounded-full text-sm whitespace-nowrap ${selectedSubcategory === subcategory ? 'bg-primary text-white' : 'bg-light'}`}
                            onClick={() => setSelectedSubcategory(subcategory)}
                          >
                            {subcategory}
                          </button>
                        ))}
                        <button 
                          className="px-4 py-2 rounded-full text-sm text-gray-500 border border-gray-300 whitespace-nowrap"
                          onClick={handleEditSubcategories}
                        >
                          编辑
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {/* 衣物网格 */}
                <div className="grid grid-cols-3 gap-4">
                  {filteredClothing.map((item) => (
                    <ClothingCard 
                      key={item.id} 
                      item={item} 
                      onDelete={handleDeleteClothing}
                      onEdit={handleEditClothing}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'outfit' && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-dark">我的穿搭</h2>
              <div className="flex space-x-2">
                <button 
                  className="px-3 py-1 bg-light rounded-full text-sm text-dark"
                  onClick={() => setIsCreateOutfitOpen(true)}
                >
                  创建穿搭
                </button>
              </div>
            </div>
            {/* 穿搭方案 */}
            {outfits.length === 0 ? (
              <div className="flex flex-col items-center justify-end min-h-[50vh] text-center pb-12">
                <div className="text-gray-500 mb-2">还没有穿搭方案</div>
                <div className="text-sm text-gray-400">点击右上角创建你的穿搭吧～</div>
              </div>
            ) : (
              <div className="space-y-4">
                {outfits.map((outfit) => (
                  <OutfitCard key={outfit.id} outfit={outfit} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="p-4">
            <h2 className="text-xl font-medium mb-4 text-dark">数据统计</h2>
            <Statistics clothingItems={clothingItems} />
          </div>
        )}
      </main>

      {/* 底部导航 */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 新手引导 */}
      {showGuide && clothingItems.length === 0 && (
        <Guide onComplete={() => setShowGuide(false)} onTabChange={setActiveTab} />
      )}

      {/* 拍照/上传按钮 */}
      {activeTab === 'closet' && (
        <button 
          className="fixed bottom-20 right-4 bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          onClick={() => setIsUploadOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}

      {/* 抽屉菜单 */}
      <DrawerMenu 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onSelectCategory={handleSelectCategory} 
        onAddCustomCategory={handleAddCustomCategory}
        onDeleteCategory={handleDeleteCategory}
        categories={categories}
      />

      {/* 衣物上传弹窗 */}
      <ClothingUpload 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        onSave={handleSaveClothing} 
        categories={categories}
        editingClothing={editingClothing}
      />

      {/* 创建穿搭弹窗 */}
      <CreateOutfit 
        isOpen={isCreateOutfitOpen} 
        onClose={() => setIsCreateOutfitOpen(false)} 
        onSave={handleSaveOutfit} 
        clothingItems={clothingItems} 
      />

      {/* 添加自定义分类弹窗 */}
      <AddCustomCategory 
        isOpen={isAddCustomCategoryOpen} 
        onClose={() => setIsAddCustomCategoryOpen(false)} 
        onSave={handleSaveCustomCategory} 
      />
    </div>
  )
}

export default App