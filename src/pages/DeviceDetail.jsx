import { useParams } from 'react-router-dom'
import DeviceDetails from '../components/devices/DeviceDetails'

const DeviceDetail = () => {
  const { id } = useParams()
  
  return <DeviceDetails deviceId={id} />
}

export default DeviceDetail
