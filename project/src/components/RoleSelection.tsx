import React from 'react';
import { ROLES } from '../utils/constants';
import { Role } from '../types';
import { useInterview } from '../contexts/InterviewContext';
import * as icons from 'lucide-react';

const RoleSelection: React.FC = () => {
  const { startInterview } = useInterview();

  const renderIcon = (iconName: string) => {
    const Icon = (icons as any)[iconName];
    return Icon ? <Icon className="w-6 h-6" /> : null;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Choose Your Interview Role
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Select a role to start your mock interview session
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ROLES.map((role: Role) => (
          <div 
            key={role.id}
            onClick={() => startInterview(role)}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400">
                {renderIcon(role.icon)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {role.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {role.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;