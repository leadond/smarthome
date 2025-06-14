import { useParams } from 'react-router-dom'
import RoutineDetails from '../components/routines/RoutineDetails'

const RoutineDetail = () => {
  const { id } = useParams()
  
  return <RoutineDetails routineId={id} />
}

export default RoutineDetail
