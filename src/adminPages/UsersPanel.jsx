import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Search, X } from 'lucide-react';
import axios from 'axios';

const UsersPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    password: ''
  });

  // API base URL - adjust as needed for your environment
  const API_BASE_URL = 'http://localhost:5214/api/Auth';

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/getAll`);
      
      // Ensure the response data is always treated as an array
      const userData = Array.isArray(response.data) ? response.data : [];
      setUsers(userData);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again later.');
      // Initialize with empty array to prevent filter errors
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Ensure users is always treated as an array before filtering
  const filteredUsers = Array.isArray(users) 
    ? users.filter(user => 
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const openModal = (user = null) => {
    if (user) {
      setCurrentUser(user);
      setFormData({
        username: user.username || '',
        email: user.email || '',
        role: user.role || '',
        password: ''
      });
    } else {
      setCurrentUser(null);
      setFormData({
        username: '',
        email: '',
        role: '',
        password: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    try {
      if (currentUser) {
        // Update existing user
        const response = await axios.put(`${API_BASE_URL}/update-profile`, {
          username: formData.username,
          email: formData.email,
          role: formData.role
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        // Refresh the user list after update
        fetchUsers();
      } else {
        // Create new user
        const response = await axios.post(`${API_BASE_URL}/register`, {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role
        });
        
        // Fetch users again to get the complete list with the new user
        fetchUsers();
      }
      
      closeModal();
    } catch (err) {
      console.error('Error saving user:', err);
      alert(err.response?.data || 'An error occurred while saving the user');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${API_BASE_URL}/${userId}`);
        // Refresh the user list after deletion
        fetchUsers();
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-mono">User Management</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          <span className="font-mono">Add User</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search users..."
          className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Loading indicator */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        /* Table */
        <div className="bg-white shadow-md rounded-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-mono font-medium uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-mono font-medium uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-mono font-medium uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-mono font-medium uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-mono font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.userId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-mono">{user.userId}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono">{user.role || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => openModal(user)}
                        className="bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition-colors"
                        title="Edit user"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.userId)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                        title="Delete user"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center font-mono text-gray-500">
                      {loading ? 'Loading users...' : 'No users found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold font-mono">
                {currentUser ? 'Edit User' : 'Add New User'}
              </h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-mono font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-mono font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-mono font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                </select>
              </div>
              {!currentUser && (
                <div className="mb-4">
                  <label className="block text-sm font-mono font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={!currentUser}
                  />
                </div>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-mono hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded font-mono hover:bg-blue-700 transition-colors"
                >
                  {currentUser ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPanel;