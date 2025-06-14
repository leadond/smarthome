import React from 'react';
import { useRoutineStore } from '../stores/routineStore';
import { motion } from 'framer-motion';

const RoutineCard = ({ routine, onClick }) => {
  const { getIconComponent, executeRoutine } = useRoutineStore();
  
  // Get the icon component based on the iconName string
  const IconComponent = getIconComponent(routine.iconName);
  
  const handleExecute = async (e) => {
    e.stopPropagation();
    await executeRoutine(routine.id);
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition-all"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className={`p-3 rounded-lg mr-3 ${routine.color}`}>
            <IconComponent size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{routine.name}</h3>
            <p className="text-sm text-gray-500">
              {routine.schedule || 'Manual trigger'}
            </p>
          </div>
        </div>
        <button
          onClick={handleExecute}
          className="bg-primary-50 hover:bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium transition-colors"
        >
          Run
        </button>
      </div>
      
      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
        <div>{routine.deviceCount} devices</div>
        <div>Run {routine.timesExecuted} times</div>
      </div>
    </motion.div>
  );
};

export default RoutineCard;
