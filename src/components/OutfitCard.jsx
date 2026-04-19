import { useState } from 'react'

const OutfitCard = ({ outfit }) => {
  return (
    <div className="bg-white rounded-lg shadow-soft overflow-hidden transition-all duration-300 hover:shadow-medium">
      <div className="p-4">
        <h3 className="font-medium mb-2 text-dark">{outfit.name}</h3>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {outfit.items.map((item, index) => (
            <div key={index} className="w-16 h-16 bg-light rounded flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-105">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OutfitCard