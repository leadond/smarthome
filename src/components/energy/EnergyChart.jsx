import { useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { useEnergyStore } from '../../stores/energyStore'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const EnergyChart = () => {
  const { hourlyUsage, dailyUsage, weeklyUsage, monthlyUsage, fetchEnergyData } = useEnergyStore()
  const [timeRange, setTimeRange] = useState('day') // 'day', 'week', 'month', 'year'
  const [chartType, setChartType] = useState('line') // 'line', 'bar'
  
  const getChartData = () => {
    let labels, data
    
    switch (timeRange) {
      case 'day':
        labels = hourlyUsage.map(item => item.hour)
        data = hourlyUsage.map(item => item.usage)
        break
      case 'week':
        labels = dailyUsage.map(item => item.day)
        data = dailyUsage.map(item => item.usage)
        break
      case 'month':
        labels = weeklyUsage.map(item => item.week)
        data = weeklyUsage.map(item => item.usage)
        break
      case 'year':
        labels = monthlyUsage.map(item => item.month)
        data = monthlyUsage.map(item => item.usage)
        break
      default:
        labels = []
        data = []
    }
    
    return {
      labels,
      datasets: [
        {
          label: 'Energy Usage (kWh)',
          data,
          borderColor: '#4f46e5',
          backgroundColor: chartType === 'line' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.7)',
          tension: 0.3,
          fill: chartType === 'line',
          pointBackgroundColor: '#4f46e5',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        }
      ]
    }
  }
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1e293b',
        bodyColor: '#1e293b',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            return `${context.parsed.y} kWh`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 11,
          },
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9',
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 11,
          },
          callback: function(value) {
            return value + ' kWh'
          }
        }
      }
    }
  }
  
  // Calculate total usage for the selected time range
  const calculateTotalUsage = () => {
    let data
    
    switch (timeRange) {
      case 'day':
        data = hourlyUsage
        break
      case 'week':
        data = dailyUsage
        break
      case 'month':
        data = weeklyUsage
        break
      case 'year':
        data = monthlyUsage
        break
      default:
        data = []
    }
    
    return data.reduce((total, item) => total + item.usage, 0).toFixed(1)
  }
  
  // Calculate average usage for the selected time range
  const calculateAverageUsage = () => {
    let data
    
    switch (timeRange) {
      case 'day':
        data = hourlyUsage
        break
      case 'week':
        data = dailyUsage
        break
      case 'month':
        data = weeklyUsage
        break
      case 'year':
        data = monthlyUsage
        break
      default:
        data = []
    }
    
    return data.length > 0 
      ? (data.reduce((total, item) => total + item.usage, 0) / data.length).toFixed(1)
      : '0.0'
  }
  
  // Calculate estimated cost
  const calculateEstimatedCost = () => {
    const totalUsage = parseFloat(calculateTotalUsage())
    const rate = 0.15 // $0.15 per kWh
    return (totalUsage * rate).toFixed(2)
  }

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-secondary-900">Energy Usage</h2>
        
        <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
          <div className="flex">
            <button
              className={`px-3 py-1 text-sm rounded-l-lg ${timeRange === 'day' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
              onClick={() => setTimeRange('day')}
            >
              Day
            </button>
            <button
              className={`px-3 py-1 text-sm ${timeRange === 'week' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button
              className={`px-3 py-1 text-sm ${timeRange === 'month' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-r-lg ${timeRange === 'year' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
              onClick={() => setTimeRange('year')}
            >
              Year
            </button>
          </div>
          
          <div className="flex">
            <button
              className={`px-3 py-1 text-sm rounded-l-lg ${chartType === 'line' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
              onClick={() => setChartType('line')}
            >
              Line
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-r-lg ${chartType === 'bar' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
              onClick={() => setChartType('bar')}
            >
              Bar
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-secondary-50 rounded-lg p-4">
          <p className="text-sm text-secondary-500">Total Usage</p>
          <p className="text-2xl font-semibold text-secondary-900">{calculateTotalUsage()} kWh</p>
        </div>
        
        <div className="bg-secondary-50 rounded-lg p-4">
          <p className="text-sm text-secondary-500">Average Usage</p>
          <p className="text-2xl font-semibold text-secondary-900">{calculateAverageUsage()} kWh</p>
        </div>
        
        <div className="bg-secondary-50 rounded-lg p-4">
          <p className="text-sm text-secondary-500">Estimated Cost</p>
          <p className="text-2xl font-semibold text-secondary-900">${calculateEstimatedCost()}</p>
        </div>
      </div>
      
      <div className="h-80">
        {chartType === 'line' ? (
          <Line data={getChartData()} options={chartOptions} />
        ) : (
          <Bar data={getChartData()} options={chartOptions} />
        )}
      </div>
    </div>
  )
}

export default EnergyChart
