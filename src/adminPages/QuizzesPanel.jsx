import React, { useState } from 'react';
import { Edit, Trash2, Plus, Search, X, PlusCircle, MinusCircle, Check } from 'lucide-react';

const QuizzesPanel = () => {
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      question: "Who is the richest person in Nepal?",
      options: [
        "Binod Chaudhary",
        "Shesh Ghale",
        "Upendra Mahato",
        "Ajay Sumargi"
      ],
      correctAnswer: "Binod Chaudhary",
      category: "Business"
    },
    {
      id: 2,
      question: "Which industry is Binod Chaudhary primarily associated with?",
      options: [
        "Banking",
        "Real Estate",
        "Food and Beverage",
        "Telecommunications"
      ],
      correctAnswer: "Food and Beverage",
      category: "Business"
    },
    {
      id: 3,
      question: "What is the capital city of Nepal?",
      options: [
        "Pokhara",
        "Kathmandu",
        "Biratnagar",
        "Bhaktapur"
      ],
      correctAnswer: "Kathmandu",
      category: "Geography"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    category: ''
  });

  // Get unique categories
  const categories = ['All', ...new Set(quizzes.map(quiz => quiz.category))];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          quiz.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || quiz.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const openModal = (quiz = null) => {
    if (quiz) {
      setCurrentQuiz(quiz);
      setFormData({
        question: quiz.question,
        options: [...quiz.options],
        correctAnswer: quiz.correctAnswer,
        category: quiz.category
      });
    } else {
      setCurrentQuiz(null);
      setFormData({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        category: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentQuiz(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({
      ...formData,
      options: newOptions
    });
  };

  const addOption = () => {
    if (formData.options.length < 6) {
      setFormData({
        ...formData,
        options: [...formData.options, '']
      });
    }
  };

  const removeOption = (index) => {
    if (formData.options.length > 2) {
      const newOptions = [...formData.options];
      newOptions.splice(index, 1);
      
      // Update correctAnswer if the removed option was the correct one
      let correctAnswer = formData.correctAnswer;
      if (formData.options[index] === formData.correctAnswer) {
        correctAnswer = '';
      }
      
      setFormData({
        ...formData,
        options: newOptions,
        correctAnswer
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty options
    const filteredOptions = formData.options.filter(option => option.trim() !== '');
    
    if (currentQuiz) {
      // Update existing quiz
      setQuizzes(quizzes.map(quiz => 
        quiz.id === currentQuiz.id 
          ? { 
              ...quiz, 
              question: formData.question,
              options: filteredOptions,
              correctAnswer: formData.correctAnswer,
              category: formData.category
            } 
          : quiz
      ));
    } else {
      // Create new quiz
      const newQuiz = {
        id: Math.max(...quizzes.map(q => q.id), 0) + 1,
        question: formData.question,
        options: filteredOptions,
        correctAnswer: formData.correctAnswer,
        category: formData.category
      };
      setQuizzes([...quizzes, newQuiz]);
    }
    
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      setQuizzes(quizzes.filter(quiz => quiz.id !== id));
    }
  };

  const setCorrectAnswer = (option) => {
    setFormData({
      ...formData,
      correctAnswer: option
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-mono">Quiz Management</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          <span className="font-mono">Add Quiz</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search quizzes..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="md:w-64">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredQuizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white shadow-md rounded-md overflow-hidden border border-gray-200">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold font-mono mb-1">{quiz.question}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-mono px-2 py-1 rounded">
                    {quiz.category}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openModal(quiz)}
                    className="bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {quiz.options.map((option, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-md text-sm font-mono border ${
                      option === quiz.correctAnswer 
                        ? 'bg-green-100 border-green-500' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    {option === quiz.correctAnswer && (
                      <Check size={16} className="inline-block mr-2 text-green-600" />
                    )}
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        {filteredQuizzes.length === 0 && (
          <div className="text-center py-10 bg-white rounded-md shadow-md border border-gray-200">
            <p className="font-mono text-gray-500">No quizzes found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold font-mono">
                {currentQuiz ? 'Edit Quiz' : 'Add New Quiz'}
              </h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-mono font-medium text-gray-700 mb-1">
                  Question
                </label>
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-mono font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-mono font-medium text-gray-700">
                    Options
                  </label>
                  {formData.options.length < 6 && (
                    <button 
                      type="button" 
                      onClick={addOption} 
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <PlusCircle size={16} className="mr-1" />
                      <span className="font-mono">Add Option</span>
                    </button>
                  )}
                </div>
                
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <div 
                      className={`w-6 h-6 flex items-center justify-center rounded-full border cursor-pointer ${
                        option === formData.correctAnswer
                          ? 'bg-green-500 border-green-600 text-white'
                          : 'bg-white border-gray-300 hover:bg-gray-100'
                      }`}
                      onClick={() => option.trim() !== '' ? setCorrectAnswer(option) : null}
                    >
                      {option === formData.correctAnswer && <Check size={14} />}
                    </div>
                    <input
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    {formData.options.length > 2 && (
                      <button 
                        type="button" 
                        onClick={() => removeOption(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MinusCircle size={20} />
                      </button>
                    )}
                  </div>
                ))}
                {!formData.options.includes(formData.correctAnswer) && formData.correctAnswer && (
                  <p className="text-sm text-red-500 font-mono mt-1">
                    Selected correct answer is not in options list.
                  </p>
                )}
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
                  disabled={!formData.options.includes(formData.correctAnswer)}
                >
                  {currentQuiz ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizzesPanel;