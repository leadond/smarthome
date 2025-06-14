import { useState, useEffect } from 'react'
import { MdOutlineWbSunny, MdOutlineCloud, MdOutlineWaterDrop, MdOutlineAir, MdOutlineWbCloudy, MdThunderstorm, MdOutlineAcUnit } from 'react-icons/md'

const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    temperature: 72,
    condition: 'Sunny',
    humidity: 45,
    windSpeed: 8,
    forecast: [
      { day: 'Mon', temp: 72, condition: 'sunny' },
      { day: 'Tue', temp: 68, condition: 'partly-cloudy' },
      { day: 'Wed', temp: 65, condition: 'cloudy' },
      { day: 'Thu', temp: 70, condition: 'partly-cloudy' },
      { day: 'Fri', temp: 75, condition: 'sunny' },
    ]
  })
  
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny':
        return <MdOutlineWbSunny className="text-warning-500" size={24} />
      case 'partly-cloudy':
        return <MdOutlineWbCloudy className="text-secondary-400" size={24} />
      case 'cloudy':
        return <MdOutlineCloud className="text-secondary-500" size={24} />
      case 'rainy':
        return <MdOutlineWaterDrop className="text-primary-500" size={24} />
      case 'stormy':
        return <MdThunderstorm className="text-secondary-700" size={24} />
      case 'snowy':
        return <MdOutlineAcUnit className="text-secondary-300" size={24} />
      default:
        return <MdOutlineWbSunny className="text-warning-500" size={24} />
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-secondary-900">Weather</h2>
        <span className="text-sm text-secondary-500">San Francisco, CA</span>
      </div>
      
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mr-4">
            {getWeatherIcon(weather.condition.toLowerCase())}
          </div>
          <div>
            <p className="text-3xl font-semibold text-secondary-900">{weather.temperature}°</p>
            <p className="text-secondary-500">{weather.condition}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <div className="flex items-center">
            <MdOutlineWaterDrop className="text-primary-500 mr-2" size={20} />
            <div>
              <p className="text-xs text-secondary-500">Humidity</p>
              <p className="text-sm font-medium">{weather.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <MdOutlineAir className="text-secondary-500 mr-2" size={20} />
            <div>
              <p className="text-xs text-secondary-500">Wind</p>
              <p className="text-sm font-medium">{weather.windSpeed} mph</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 border-t border-secondary-100 pt-4">
        <div className="flex justify-between">
          {weather.forecast.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <p className="text-xs text-secondary-500">{day.day}</p>
              <div className="my-2">
                {getWeatherIcon(day.condition)}
              </div>
              <p className="text-sm font-medium">{day.temp}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget
