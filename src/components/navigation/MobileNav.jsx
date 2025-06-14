import { NavLink } from 'react-router-dom'
import { 
  MdDashboard, 
  MdDevices, 
  MdMeetingRoom, 
  MdAutoAwesome, 
  MdBolt 
} from 'react-icons/md'

const navItems = [
  { path: '/', label: 'Home', icon: <MdDashboard size={24} /> },
  { path: '/devices', label: 'Devices', icon: <MdDevices size={24} /> },
  { path: '/rooms', label: 'Rooms', icon: <MdMeetingRoom size={24} /> },
  { path: '/routines', label: 'Routines', icon: <MdAutoAwesome size={24} /> },
  { path: '/energy', label: 'Energy', icon: <MdBolt size={24} /> },
]

const MobileNav = () => {
  return (
    <nav className="md:hidden bg-white border-t border-secondary-200 fixed bottom-0 left-0 right-0 z-10">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex flex-col items-center py-2 px-3 ${
                isActive 
                  ? 'text-primary-600' 
                  : 'text-secondary-500'
              }`
            }
          >
            <span>{item.icon}</span>
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default MobileNav
