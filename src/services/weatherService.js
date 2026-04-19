// 模拟天气服务
export const getCurrentWeather = async () => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // 模拟返回天气数据
  return {
    temperature: 25,
    condition: '晴天',
    humidity: 60,
    windSpeed: 10,
  }
}

export const getWeatherBasedClothingSuggestions = (weather) => {
  const { temperature } = weather
  
  if (temperature > 30) {
    return {
      thickness: '薄',
      types: ['T恤', '短裤', '连衣裙'],
      suggestion: '天气炎热，建议穿着轻薄透气的衣物'
    }
  } else if (temperature > 20) {
    return {
      thickness: '中',
      types: ['衬衫', '休闲裤', '薄外套'],
      suggestion: '天气舒适，建议穿着适中厚度的衣物'
    }
  } else if (temperature > 10) {
    return {
      thickness: '中厚',
      types: ['卫衣', '牛仔裤', '外套'],
      suggestion: '天气微凉，建议穿着稍厚的衣物'
    }
  } else {
    return {
      thickness: '厚',
      types: ['毛衣', '厚外套', '保暖裤'],
      suggestion: '天气寒冷，建议穿着保暖衣物'
    }
  }
}