import EnergyChart from '../components/energy/EnergyChart'
import DeviceEnergyList from '../components/energy/DeviceEnergyList'
import EnergySavingTips from '../components/energy/EnergySavingTips'

const Energy = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-secondary-900">Energy Monitoring</h1>
      
      <EnergyChart />
      
      <DeviceEnergyList />
      
      <EnergySavingTips />
    </div>
  )
}

export default Energy
