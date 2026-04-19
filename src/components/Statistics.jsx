import { useState, useEffect } from 'react'

const Statistics = ({ clothingItems }) => {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    if (clothingItems.length > 0) {
      const frequentItems = clothingItems.filter(item => (item.frequency === '经常' || item.wearFrequency === '经常'))
      const occasionalItems = clothingItems.filter(item => (item.frequency === '偶尔' || item.wearFrequency === '偶尔'))
      const rareItems = clothingItems.filter(item => (item.frequency === '很少' || item.wearFrequency === '很少'))

      setStats({
        totalItems: clothingItems.length,
        frequentItems,
        occasionalItems,
        rareItems,
      })
    }
  }, [clothingItems])

  // 计算各品类的数量
  const categoryCounts = clothingItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {})

  const categoryNames = {
    tops: '上衣',
    bottoms: '下装',
    dresses: '连衣裙',
    accessories: '饰品',
    shoes: '鞋子',
  }

  if (!stats) return (
    <div className="p-4 bg-white rounded-lg shadow-soft">
      <div className="text-center text-gray-500 py-8">
        <p className="mb-2">暂无统计数据</p>
        <p className="text-sm">添加衣物后即可查看统计</p>
      </div>
    </div>
  )

  return (
    <div className="p-4 bg-white rounded-lg shadow-soft">
      
      {/* 品类分布 */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3 text-dark">品类分布</h3>
        <div className="space-y-2">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <div key={category} className="flex items-center">
              <div className="w-24 text-sm text-dark">{categoryNames[category]}</div>
              <div className="flex-1 bg-light rounded-full h-2 mr-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(count / clothingItems.length) * 100}%` }}
                ></div>
              </div>
              <div className="w-8 text-sm text-dark text-right">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 穿着频率分析 */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3 text-dark">穿着频率分析</h3>

        {/* 经常穿着 */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-dark">经常穿着</span>
            <span className="font-medium">{stats.frequentItems.length}</span>
          </div>
          {stats.frequentItems.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {stats.frequentItems.map((item) => (
                <span key={item.id} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {item.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 偶尔穿着 */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-dark">偶尔穿着</span>
            <span className="font-medium">{stats.occasionalItems.length}</span>
          </div>
          {stats.occasionalItems.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {stats.occasionalItems.map((item) => (
                <span key={item.id} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  {item.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 很少穿着 */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-dark">很少穿着</span>
            <span className="font-medium">{stats.rareItems.length}</span>
          </div>
          {stats.rareItems.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {stats.rareItems.map((item) => (
                <span key={item.id} className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                  {item.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Statistics