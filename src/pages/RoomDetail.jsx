import { useParams } from 'react-router-dom'
import RoomDetails from '../components/rooms/RoomDetails'

const RoomDetail = () => {
  const { id } = useParams()
  
  return <RoomDetails roomId={id} />
}

export default RoomDetail
