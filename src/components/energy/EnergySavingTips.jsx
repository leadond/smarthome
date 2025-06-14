import { useState } from 'react'
import { MdLightbulb, MdThermostat, MdDevices, MdCheck } from 'react-icons/md'

const EnergySavingTips = () => {
  const [implementedTips, setImplementedTips] = useState([])
  
  const tips = [
    {
      id: 1,
      category: 'lighting',
      title: 'Switch to LED bulbs',
      description: 'LED bulbs use up to 75% less energy than incandescent lighting and can last 25 times longer.',
      savingPotential: 'Save up to $75 per year',
      icon: <MdLightbulb size={24} className="text-warning-500" />
    },
    {
      id: 2,
      category: 'lighting',
      title: 'Use motion sensors',
      description: 'Install motion sensors to automatically turn lights off when rooms are unoccupied.',
      savingPotential: 'Save up to $50 per year',
      icon: <MdLightbulb size={24} className="text-warning-500" />
    },
    {
      id: 3,
      category: 'climate',
      title: 'Optimize thermostat schedule',
      description: 'Set your thermostat to adjust temperatures when you\'re asleep or away from home.',
      savingPotential: 'Save up to $180 per year',
      icon: <MdThermostat size={24} className="text-primary-500" />
    },
    {
      id: 4,
      category: 'climate',
      title: 'Use ceiling fans',
      description: 'Ceiling fans allow you to raise the thermostat setting by about 4°F with no reduction in comfort.',
      savingPotential: 'Save up to $165 per year',
      icon: <MdThermostat size={24} className="text-primary-500" />
    },
    {
      id: 5,
      category: 'devices',
      title: 'Unplug idle electronics',
      description: 'Create a routine to turn off power to devices that aren\'t in use to eliminate phantom energy use.',
      savingPotential: 'Save up to $100 per year',
      icon: <MdDevices size={24} className="text-secondary-500" />
    },
    {
      id: 6,
      category: 'devices',
      title: 'Schedule device usage',
      description: 'Run high-energy appliances during off-peak hours when electricity rates may be lower.',
      savingPotential: 'Save up to $120 per year',
      icon: <MdDevices size={24} className="text-secondary-500" />
    }
  ]
  
  const [activeCategory, setActiveCategory] = useState('all')
  
  const filteredTips = activeCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === activeCategory)
  
  const toggleImplemented = (tipId) => {
    if (implementedTips.includes(tipId)) {
      setImplementedTips(implementedTips.filter(id => id !== tipId))
    } else {
      setImplementedTips([...implementedTips, tipId])
    }
  }
  
  // Calculate potential savings
  const calculatePotentialSavings = () => {
    const implementedSavings = tips
      .filter(tip => implementedTips.includes(tip.id))
      .reduce((total, tip) => {
        const savingAmount = parseInt(tip.savingPotential.match(/\$(\d+)/)[1])
        return total + savingAmount
      }, 0)
    
    const totalPotentialSavings = tips.reduce((total, tip) => {
      const savingAmount = parseInt(tip.savingPotential.match(/\$(\d+)/)[1])
      return total + savingAmount
    }, 0)
    
    return {
      implemented: implementedSavings,
      potential: totalPotentialSavings - implementedSavings
    }
  }
  
  const savings = calculatePotentialSavings()

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-secondary-900">Energy Saving Tips</h2>
        
        <div className="flex mt-3 md:mt-0">
          <button
            className={`px-3 py-1 text-sm rounded-l-lg ${activeCategory === 'all' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 text-sm ${activeCategory === 'lighting' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
            onClick={() => setActiveCategory('lighting')}
          >
            Lighting
          </button>
          <button
            className={`px-3 py-1 text-sm ${activeCategory === 'climate' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
            onClick={() => setActiveCategory('climate')}
          >
            Climate
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-r-lg ${activeCategory === 'devices' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
            onClick={() => setActiveCategory('devices')}
          >
            Devices
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-secondary-50 rounded-lg p-4">
          <p className="text-sm text-secondary-500">Implemented Savings</p>
          <p className="text-2xl font-semibold text-success-600">${savings.implemented} per year</p>
        </div>
        
        <div className="bg-secondary-50 rounded-lg p-4">
          <p className="text-sm text-secondary-500">Potential Additional Savings</p>
          <p className="text-2xl font-semibold text-primary-600">${savings.potential} per year</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredTips.map((tip) => (
          <div 
            key={tip.id} 
            className={`p-4 rounded-lg border ${
              implementedTips.includes(tip.id) 
                ? 'border-success-200 bg-success-50' 
                : 'border-secondary-200 hover:border-primary-200 hover:bg-primary-50'
            } transition-colors`}
          >
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                {tip.icon}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-secondary-900">{tip.title}</h3>
                  <button
                    onClick={() => toggleImplemented(tip.id)}
                    className={`p-2 rounded-full ${
                      implementedTips.includes(tip.id) 
                        ? 'bg-success-100 text-success-600' 
                        : 'bg-secondary-100 text-secondary-500 hover:bg-primary-100 hover:text-primary-600'
                    }`}
                  >
                    <MdCheck size={20} />
                  </button>
                </div>
                <p className="mt-1 text-secondary-600">{tip.description}</p>
                <p className="mt-2 text-sm font-medium text-primary-600">{tip.savingPotential}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EnergySavingTips
