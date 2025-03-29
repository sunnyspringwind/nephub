import React, { useState } from 'react';
import { Edit, Trash2, Plus, Search, X, PlusCircle, MinusCircle } from 'lucide-react';

const EntitiesPanel = () => {
  const [entities, setEntities] = useState([
    {
      id: 1,
      name: "Buddha",
      image: "https://i.etsystatic.com/22329553/r/il/140e6f/4674731310/il_fullxfull.4674731310_nksq.jpg",
      userId: "df853e9d-d65e-4042-8f41-36377d46f649",
      attributes: [
        {
          key: "age",
          value: "20"
        },
        {
          key: "origin",
          value: "Nepal"
        }
      ]
    },
    {
      id: 2,
      name: "Ganesha",
      image: "https://example.com/ganesha.jpg",
      userId: "5f853e9d-d65e-4042-8f41-36377d46f123",
      attributes: [
        {
          key: "deity",
          value: "Hindu"
        }
      ]
    },
    {
      id: 3,
      name: "Shiva",
      image: "https://example.com/shiva.jpg",
      userId: "6a853e9d-d65e-4042-8f41-36377d46f456",
      attributes: [
        {
          key: "role",
          value: "Destroyer"
        },
        {
          key: "symbol",
          value: "Trishula"
        }
      ]
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEntity, setCurrentEntity] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    attributes: [{ key: '', value: '' }]
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEntities = entities.filter(entity => 
    entity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (entity = null) => {
    if (entity) {
      setCurrentEntity(entity);
      setFormData({
        name: entity.name,
        image: entity.image,
        attributes: [...entity.attributes]
      });
    } else {
      setCurrentEntity(null);
      setFormData({
        name: '',
        image: '',
        attributes: [{ key: '', value: '' }]
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEntity(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAttributeChange = (index, field, value) => {
    const newAttributes = [...formData.attributes];
    newAttributes[index][field] = value;
    setFormData({
      ...formData,
      attributes: newAttributes
    });
  };

  const addAttribute = () => {
    setFormData({
      ...formData,
      attributes: [...formData.attributes, { key: '', value: '' }]
    });
  };

  const removeAttribute = (index) => {
    const newAttributes = [...formData.attributes];
    newAttributes.splice(index, 1);
    setFormData({
      ...formData,
      attributes: newAttributes
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty attributes
    const filteredAttributes = formData.attributes.filter(attr => 
      attr.key.trim() !== '' && attr.value.trim() !== ''
    );
    
    if (currentEntity) {
      // Update existing entity
      setEntities(entities.map(entity => 
        entity.id === currentEntity.id 
          ? { 
              ...entity, 
              name: formData.name,
              image: formData.image,
              attributes: filteredAttributes
            } 
          : entity
      ));
    } else {
      // Create new entity
      const newEntity = {
        id: Math.max(...entities.map(e => e.id), 0) + 1,
        name: formData.name,
        image: formData.image,
        userId: crypto.randomUUID(),
        attributes: filteredAttributes
      };
      setEntities([...entities, newEntity]);
    }
    
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entity?')) {
      setEntities(entities.filter(entity => entity.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-mono">Entity Management</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          <span className="font-mono">Add Entity</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search entities..."
          className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntities.map((entity) => (
          <div key={entity.id} className="bg-white shadow-md rounded-md overflow-hidden border border-gray-200">
            <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
              {entity.image ? (
                <img 
                  src={entity.image} 
                  alt={entity.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "/api/placeholder/400/320"; }}
                />
              ) : (
                <div className="text-gray-400 font-mono">No Image</div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold font-mono mb-2">{entity.name}</h3>
              <div className="space-y-1 mb-4">
                {entity.attributes.map((attr, index) => (
                  <div key={index} className="flex text-sm">
                    <span className="font-mono font-semibold text-gray-600">{attr.key}:</span>
                    <span className="font-mono ml-2">{attr.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => openModal(entity)}
                  className="bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(entity.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredEntities.length === 0 && (
          <div className="col-span-full text-center py-10 bg-white rounded-md shadow-md border border-gray-200">
            <p className="font-mono text-gray-500">No entities found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold font-mono">
                {currentEntity ? 'Edit Entity' : 'Add New Entity'}
              </h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-mono font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-mono font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-mono font-medium text-gray-700">
                    Attributes
                  </label>
                  <button 
                    type="button" 
                    onClick={addAttribute} 
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <PlusCircle size={16} className="mr-1" />
                    <span className="font-mono">Add Attribute</span>
                  </button>
                </div>
                
                {formData.attributes.map((attr, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      placeholder="Key"
                      value={attr.key}
                      onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={attr.value}
                      onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.attributes.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeAttribute(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MinusCircle size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
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
                  {currentEntity ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntitiesPanel;