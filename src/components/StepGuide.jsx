import { useState } from 'react'

const StepGuide = ({ onComplete, onTabChange }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleGoToOutfit = () => {
    setCurrentStep(3)
    onTabChange('outfit')
  }

  const handleGoToStats = () => {
    setCurrentStep(4)
    onTabChange('stats')
  }

  const handleGoToCloset = () => {
    onTabChange('closet')
    onComplete()
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* 步骤 1: 查看分类 */}
      {currentStep === 1 && (
        <div className="absolute top-12 left-4 pointer-events-auto">
          <div className="bg-white rounded-lg p-3 shadow-lg max-w-xs">
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-medium mr-2 flex-shrink-0">1</div>
              <div>
                <div className="font-medium text-dark mb-1">查看分类</div>
                <div className="text-sm text-gray-600 mb-3">点击左上角的菜单图标，可查看和切换不同的衣物分类</div>
                <button
                  className="px-3 py-1 bg-primary text-white rounded text-sm"
                  onClick={handleNext}
                >
                  我知道了
                </button>
              </div>
            </div>
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-white rounded-full border-2 border-primary"></div>
          </div>
        </div>
      )}

      {/* 步骤 2: 添加衣物 */}
      {currentStep === 2 && (
        <div className="absolute bottom-24 right-4 pointer-events-auto">
          <div className="bg-white rounded-lg p-3 shadow-lg max-w-xs">
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-medium mr-2 flex-shrink-0">2</div>
              <div>
                <div className="font-medium text-dark mb-1">添加衣物</div>
                <div className="text-sm text-gray-600 mb-3">点击右下角的"+"按钮，拍照或从相册选择衣物</div>
                <button
                  className="px-3 py-1 bg-primary text-white rounded text-sm"
                  onClick={handleGoToOutfit}
                >
                  我知道了
                </button>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white rounded-full border-2 border-primary"></div>
          </div>
        </div>
      )}

      {/* 步骤 3: 穿搭功能 */}
      {currentStep === 3 && (
        <div className="absolute top-24 right-4 pointer-events-auto">
          <div className="bg-white rounded-lg p-3 shadow-lg max-w-xs">
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-medium mr-2 flex-shrink-0">3</div>
              <div>
                <div className="font-medium text-dark mb-1">穿搭功能</div>
                <div className="text-sm text-gray-600 mb-3">在"穿搭"页面创建搭配方案</div>
                <button
                  className="px-3 py-1 bg-primary text-white rounded text-sm"
                  onClick={handleGoToStats}
                >
                  我知道了
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 步骤 4: 统计功能 */}
      {currentStep === 4 && (
        <div className="absolute bottom-20 right-4 pointer-events-auto">
          <div className="bg-white rounded-lg p-3 shadow-lg max-w-xs">
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-medium mr-2 flex-shrink-0">4</div>
              <div>
                <div className="font-medium text-dark mb-1">数据统计</div>
                <div className="text-sm text-gray-600 mb-3">查看衣物分布和穿着频率分析，了解您的穿搭习惯</div>
                <button
                  className="px-3 py-1 bg-primary text-white rounded text-sm"
                  onClick={handleGoToCloset}
                >
                  开始使用
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StepGuide