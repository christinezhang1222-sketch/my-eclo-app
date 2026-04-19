const Guide = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-sm mx-4 p-6">
        <h2 className="text-xl font-medium mb-4 text-center" style={{ color: '#7BC2E8' }}>欢迎使用ECLO 电子衣柜</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-medium mr-3 flex-shrink-0">1</div>
            <div>
              <div className="font-medium text-dark mb-1">查看分类</div>
              <div className="text-sm text-gray-600">点击左上角的菜单图标，可查看所有衣物分类</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-medium mr-3 flex-shrink-0">2</div>
            <div>
              <div className="font-medium text-dark mb-1">添加衣物</div>
              <div className="text-sm text-gray-600">点击右下角的"+"按钮，拍照或从相册选择衣物</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-medium mr-3 flex-shrink-0">3</div>
            <div>
              <div className="font-medium text-dark mb-1">创建穿搭</div>
              <div className="text-sm text-gray-600">在"穿搭"页面创建自己的搭配方案</div>
            </div>
          </div>
        </div>
        
        <button 
          className="w-full bg-primary text-white py-3 rounded-lg font-medium"
          onClick={onClose}
        >
          开始使用
        </button>
      </div>
    </div>
  )
}

export default Guide