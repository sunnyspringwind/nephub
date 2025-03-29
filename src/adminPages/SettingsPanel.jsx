import React, { useState } from 'react';
import { Save, RefreshCw, Moon, Sun, Monitor } from 'lucide-react';

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    autoSave: true,
    compactMode: false,
    showGridLines: true,
    confirmDelete: true,
    maxItemsPerPage: 10,
    timezone: 'UTC',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 800);
  };
  
  const resetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        theme: 'light',
        notifications: true,
        autoSave: true,
        compactMode: false,
        showGridLines: true,
        confirmDelete: true,
        maxItemsPerPage: 10,
        timezone: 'UTC',
      });
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-mono">Settings</h2>
        <p className="text-gray-600 font-mono mt-1">Customize your admin dashboard experience</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-md rounded-md p-6 border border-gray-200 space-y-8">
          {/* Appearance Section */}
          <div>
            <h3 className="text-lg font-bold font-mono mb-4 text-gray-800 border-b pb-2">Appearance</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-mono font-medium text-gray-700 mb-2">
                Theme
              </label>
              <div className="flex space-x-4">
                <label className={`flex items-center p-3 rounded-md border ${settings.theme === 'light' ? 'bg-blue-50 border-blue-300' : 'border-gray-300'} cursor-pointer hover:bg-gray-50`}>
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={settings.theme === 'light'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <Sun size={18} className="mr-2 text-yellow-500" />
                  <span className="font-mono">Light</span>
                </label>
                
                <label className={`flex items-center p-3 rounded-md border ${settings.theme === 'dark' ? 'bg-blue-50 border-blue-300' : 'border-gray-300'} cursor-pointer hover:bg-gray-50`}>
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={settings.theme === 'dark'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <Moon size={18} className="mr-2 text-indigo-500" />
                  <span className="font-mono">Dark</span>
                </label>
                
                <label className={`flex items-center p-3 rounded-md border ${settings.theme === 'system' ? 'bg-blue-50 border-blue-300' : 'border-gray-300'} cursor-pointer hover:bg-gray-50`}>
                  <input
                    type="radio"
                    name="theme"
                    value="system"
                    checked={settings.theme === 'system'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <Monitor size={18} className="mr-2 text-gray-500" />
                  <span className="font-mono">System</span>
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="compactMode"
                  checked={settings.compactMode}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-mono font-medium text-gray-700">Compact Mode</span>
              </label>
              <p className="text-xs text-gray-500 font-mono mt-1 ml-5">Reduce spacing and padding throughout the interface</p>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="showGridLines"
                  checked={settings.showGridLines}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-mono font-medium text-gray-700">Show Grid Lines</span>
              </label>
              <p className="text-xs text-gray-500 font-mono mt-1 ml-5">Display grid lines in tables and data views</p>
            </div>
          </div>
          
          {/* Behavior Section */}
          <div>
            <h3 className="text-lg font-bold font-mono mb-4 text-gray-800 border-b pb-2">Behavior</h3>
            
            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-mono font-medium text-gray-700">Enable Notifications</span>
              </label>
              <p className="text-xs text-gray-500 font-mono mt-1 ml-5">Receive system notifications for important events</p>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="autoSave"
                  checked={settings.autoSave}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-mono font-medium text-gray-700">Auto Save</span>
              </label>
              <p className="text-xs text-gray-500 font-mono mt-1 ml-5">Automatically save changes when editing content</p>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="confirmDelete"
                  checked={settings.confirmDelete}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-mono font-medium text-gray-700">Confirm Before Delete</span>
              </label>
              <p className="text-xs text-gray-500 font-mono mt-1 ml-5">Show confirmation dialog before deleting items</p>
            </div>
          </div>
          
          {/* Data Display Section */}
          <div>
            <h3 className="text-lg font-bold font-mono mb-4 text-gray-800 border-b pb-2">Data Display</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-mono font-medium text-gray-700 mb-2">
                Items Per Page
              </label>
              <select
                name="maxItemsPerPage"
                value={settings.maxItemsPerPage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-mono font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                name="timezone"
                value={settings.timezone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">GMT</option>
                <option value="Europe/Paris">Central European Time (CET)</option>
                <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
              </select>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={resetSettings}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RefreshCw size={16} className="mr-2" />
              Reset to Default
            </button>
            
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsPanel;