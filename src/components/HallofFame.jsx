import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from './Header';
import { fetchData } from '../utils/api';
import { data } from 'autoprefixer';


// ProfileCard Component
const ProfileCard = ({ profile }) => {
  const { id, image, name, description, attributes, position } = profile;

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-indigo-200 hover:-translate-y-1">
      {/* Profile Image */}
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Profile Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded">
            {position}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{description}</p>

        {/* Attributes */}
        <div className="flex flex-wrap gap-2 mb-6">
          {attributes.map((attr, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
            >
              {attr.key}: {attr.value}
            </span>
          ))}
        </div>

        <Link
          to={`/profiles/${id}`}
          className="inline-flex items-center justify-center w-full py-2 px-4 bg-white text-indigo-600 font-medium rounded-lg border-2 border-indigo-600 transition-all hover:bg-indigo-600 hover:text-white"
        >
          View Profile
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

// Hall of Fame Page Component
const HallOfFamePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Fetch data on component mount
  useEffect(() => {
    const fetchProfiles = async () => {
      const entityDataApi = await fetchData("http://localhost:5214/api/Entity");
      setProfiles(entityDataApi.data);
      setFilteredProfiles(entityDataApi.data);
    };
    fetchProfiles();
  }, []);

   // Filter by category
   const filterByCategory = (category) => {
    setActiveFilter(category);
    
    if (category === 'All') {
      // If "All" filter, just apply current search
      if (searchQuery === '') {
        setFilteredProfiles(profiles);
      } else {
        const results = profiles.filter(profile =>
          profile.name.toLowerCase().includes(searchQuery) ||
          profile.position.toLowerCase().includes(searchQuery)
        );
        setFilteredProfiles(results);
      }
    } else {
      // Filter by both category and current search
      const results = profiles.filter(profile => {
        const matchesCategory = profile.position === category;
        const matchesSearch = searchQuery === '' || 
                            profile.name.toLowerCase().includes(searchQuery) ||
                            profile.position.toLowerCase().includes(searchQuery);
        
        return matchesCategory && matchesSearch;
      });
      
      setFilteredProfiles(results);
    }
  };
  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query === '') {
      // If search is cleared, just apply current category filter
      filterByCategory(activeFilter);
    } else {
      // Filter by both search query and active category
      const results = profiles.filter(profile => {
        const matchesSearch = profile.name.toLowerCase().includes(query) ||
                            profile.position.toLowerCase().includes(query);
        const matchesFilter = activeFilter === 'All' || 
                            profile.position === activeFilter;
        
        return matchesSearch && matchesFilter;
      });
      
      setFilteredProfiles(results);
    }
  };

  // Get unique categories for filter buttons
  const categories = ['All', ...new Set(profiles.map(profile => profile.position))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nepal's Hall of Fame</h1>
            <p className="text-indigo-100 text-lg md:text-xl">
              Celebrating the remarkable individuals who have shaped Nepal's history, culture, and future.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto py-2 flex-grow">
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => filterByCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search profiles..."
              value={searchQuery}
              onChange={handleSearch}
              className="bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="container mx-auto px-6 pb-20">
        {filteredProfiles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No profiles match your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {console.log(filteredProfiles)}
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="container mx-auto px-6 pb-16">
        <Link
          to="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

// Profile Detail Page Component
const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API fetch
    const fetchProfile = async () => {
      setLoading(true);
      const foundProfile = await fetchData(`http://localhost:5214/api/Entity/${id}`)
      
      // Enhanced profile data with additional details
      if (foundProfile) {
        setProfile(foundProfile.data);
      }  
      setLoading(false);
    };
    fetchProfile();
  }, [id]);
console.log(profile);
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-8">The profile you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/hall-of-fame"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Return to Hall of Fame
          </Link>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Profile Header */}
        <div className="bg-white shadow-md border-b border-gray-300">
          <div className="container mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Image */}
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-gray-300 overflow-hidden shadow-md">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
  
              {/* Profile Info */}
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{profile.name}</h1>
                <p className="text-lg text-gray-600">{profile.position}</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Profile Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-10">
            {/* About Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-5">
                About Me
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">{profile.description}</p>
              </div>
            </section>
  
            {/* Professional Details */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-5">
                Professional Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {profile.attributes.map((attr, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-lg p-5 border border-gray-200 shadow-sm"
                  >
                    <h3 className="text-gray-600 font-medium mb-2">{attr.key}</h3>
                    <p className="text-gray-900 font-semibold text-lg">{attr.value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
  
        {/* Back Button */}
        <div className="container mx-auto px-6 pb-12">
          <Link
            to="/hall-of-fame"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-lg">Back to Hall of Fame</span>
          </Link>
        </div>
      </div>
    );
  };

export { HallOfFamePage, ProfilePage };