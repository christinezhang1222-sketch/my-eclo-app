import { useState } from 'react'

const BottomNav = ({ activeTab, onTabChange }) => {
  return (
    <footer className="bg-white border-t border-light fixed bottom-0 left-0 right-0">
      <div className="flex justify-around">
        <button 
          className={`flex flex-col items-center py-2 px-4 rounded-lg mx-1 ${activeTab === 'closet' ? 'text-primary' : 'text-muted'}`}
          onClick={() => onTabChange('closet')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4C12 4 10 4 10 6C10 8 12 8 12 8C12 8 14 8 14 6C14 4 12 4 12 4ZM12 8L10 11L6 14L3 17L3 20L21 20L21 17L18 14L14 11L12 8Z" />
          </svg>
          <span className="text-xs mt-1">衣柜</span>
        </button>
        <button 
          className={`flex flex-col items-center py-2 px-4 rounded-lg mx-1 ${activeTab === 'outfit' ? 'text-primary' : 'text-muted'}`}
          onClick={() => onTabChange('outfit')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span className="text-xs mt-1">穿搭</span>
        </button>
        <button 
          className={`flex flex-col items-center py-2 px-4 rounded-lg mx-1 ${activeTab === 'stats' ? 'text-primary' : 'text-muted'}`}
          onClick={() => onTabChange('stats')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-xs mt-1">统计</span>
        </button>
      </div>
    </footer>
  )
}

export default BottomNav