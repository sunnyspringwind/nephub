import React, { useState, useEffect } from 'react';
import { Clock, Home, Settings, Users, Database, FileText, LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import DashboardHome from './DashboardHome';
import UsersPanel from './UsersPanel';
import EntitiesPanel from './EntitiesPanel';
import QuizzesPanel from './QuizzesPanel';
import SettingsPanel from './SettingsPanel';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  
  // Load user data on component mount
  useEffect(() => {
    const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));
    
    // Check if user has credentials stored
    if (!userCredentials || !userCredentials.token) {
      navigate('/login');
      return;
    }
    
    try {
      // Decode token and check expiration
      const decodedToken = jwtDecode(userCredentials.token);
      const currentTime = Date.now() / 1000;
      
      if (decodedToken.exp < currentTime) {
        // Token expired
        localStorage.removeItem("userCredentials");
        navigate('/login');
        return;
      }
      
      // Check for admin role
      const isAdmin = decodedToken.role == "Admin";
      
      if (!isAdmin) {
        // Redirect non-admin users
        navigate('/user-dashboard');
        return;
      }
      
      // User is authenticated and has admin rights
      setUserData({
        ...userCredentials,
        name: decodedToken[jwtDecode.GivenName] || userCredentials.username,
        email: decodedToken[jwtDecode.Email] || userCredentials.email
      });
      
    } catch (error) {
      console.error("Error processing token", error);
      localStorage.removeItem("userCredentials");
      navigate('/login');
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("userCredentials");
    // Redirect to login page
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardHome userData={userData}/>;
      case 'users':
        return <UsersPanel userData={userData}/>;
      case 'entities':
        return <EntitiesPanel userData={userData}/>;
      case 'quizzes':
        return <QuizzesPanel userData={userData}/>;
      case 'settings':
        return <SettingsPanel userData={userData}/>;
      default:
        return <DashboardHome userData={userData}/>;
    }
  };

  // If userData is not loaded yet, show loading
  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-lg font-mono">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen && <h1 className="text-xl font-bold font-mono">RetroAdmin</h1>}
          <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-700">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <nav className="p-2">
            <NavItem 
              icon={<Home size={20} />} 
              text="Dashboard" 
              active={activeTab === 'home'} 
              onClick={() => setActiveTab('home')} 
              expanded={sidebarOpen}
            />
            <NavItem 
              icon={<Users size={20} />} 
              text="Users" 
              active={activeTab === 'users'} 
              onClick={() => setActiveTab('users')} 
              expanded={sidebarOpen}
            />
            <NavItem 
              icon={<Database size={20} />} 
              text="Entities" 
              active={activeTab === 'entities'} 
              onClick={() => setActiveTab('entities')} 
              expanded={sidebarOpen}
            />
            <NavItem 
              icon={<FileText size={20} />} 
              text="Quizzes" 
              active={activeTab === 'quizzes'} 
              onClick={() => setActiveTab('quizzes')} 
              expanded={sidebarOpen}
            />
            <NavItem 
              icon={<Settings size={20} />} 
              text="Settings" 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')} 
              expanded={sidebarOpen}
            />
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-700">
          <NavItem 
            icon={<LogOut size={20} />} 
            text="Logout" 
            onClick={handleLogout} 
            expanded={sidebarOpen}
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h2 className="text-xl font-mono font-bold text-gray-800">
            {activeTab === 'home' && 'Dashboard'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'entities' && 'Entity Management'}
            {activeTab === 'quizzes' && 'Quiz Management'}
            {activeTab === 'settings' && 'Settings'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm font-mono">
              <Clock size={16} className="inline mr-2" />
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 text-sm hidden md:block">
                <span className="font-semibold">{userData.name || userData.email}</span>
                <span className="text-xs text-gray-500 block">Admin</span>
              </div>
              <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center">
                <span className="font-mono text-xs">{userData.name ? userData.name.charAt(0).toUpperCase() : 'A'}</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, active, onClick, expanded }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center w-full p-3 my-1 rounded transition-colors ${
        active ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-700'
      }`}
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
      {expanded && <span className="ml-3 font-mono">{text}</span>}
    </button>
  );
};

export default AdminDashboard;