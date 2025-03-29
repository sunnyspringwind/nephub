import React from 'react';
import { Users, Database, FileText, TrendingUp } from 'lucide-react';

const DashboardHome = () => {
  const stats = [
    { title: 'Total Users', value: '128', icon: <Users size={24} />, color: 'bg-blue-600' },
    { title: 'Total Entities', value: '85', icon: <Database size={24} />, color: 'bg-green-600' },
    { title: 'Total Quizzes', value: '47', icon: <FileText size={24} />, color: 'bg-purple-600' },
    { title: 'Active Sessions', value: '24', icon: <TrendingUp size={24} />, color: 'bg-orange-600' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white shadow-md rounded-md p-6 flex items-center justify-between border border-gray-200"
          >
            <div>
              <p className="text-sm font-mono text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1 font-mono">{stat.value}</h3>
            </div>
            <div className={`${stat.color} p-3 rounded-md text-white`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-md shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-bold mb-4 font-mono text-gray-800">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-start border-b border-gray-100 pb-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-mono">User {item} performed an action</p>
                  <p className="text-xs text-gray-500 font-mono">{item} hour{item !== 1 ? 's' : ''} ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-md shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-bold mb-4 font-mono text-gray-800">System Status</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-mono text-sm">CPU Usage</span>
                <span className="font-mono text-sm text-gray-500">45%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-blue-500 rounded" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-mono text-sm">Memory Usage</span>
                <span className="font-mono text-sm text-gray-500">65%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-green-500 rounded" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-mono text-sm">Disk Usage</span>
                <span className="font-mono text-sm text-gray-500">28%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-purple-500 rounded" style={{ width: '28%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;