// Individual Profile Page
const ProfilePage = ({ profile }) => {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-96 bg-gray-900">
          <img
            src={profile.coverImage}
            alt="Cover"
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-purple-900/50" />
          
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4">
            <div className="flex items-end gap-6 -mb-16">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl"
              />
              <h1 className="text-4xl font-bold text-white mb-4">{profile.name}</h1>
            </div>
          </div>
        </div>
  
        {/* Profile Content */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                    <span>Position: {profile.position}</span>
                  </div>
                  {/* Add more info items */}
                </div>
              </div>
  
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.attributes.map((attr, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm"
                    >
                      {attr}
                    </span>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Right Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6">Biography</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {profile.detailedBio}
                  </p>
                </div>
  
                {/* Experience Section */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">Experience</h3>
                  <div className="space-y-6">
                    {profile.experience.map((exp, index) => (
                      <div key={index} className="border-l-4 border-purple-600 pl-4">
                        <h4 className="text-lg font-semibold">{exp.role}</h4>
                        <p className="text-gray-600">{exp.company}</p>
                        <p className="text-sm text-gray-500">{exp.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Back Button */}
        <div className="container mx-auto px-4 pb-12">
          <Link
            to="/profiles"
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" />
            </svg>
            Back to Profiles
          </Link>
        </div>
      </div>
    );
  };


  const ProfileCard = ({ image, name, description, attributes, id }) => {
    return (
      <div className="group relative bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl hover:-translate-y-2">
        {/* Image with gradient overlay */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
        </div>
  
        {/* Profile Content */}
        <div className="p-6 relative">
          <div className="absolute -top-8 left-6">
            <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-lg">
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
  
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-2">{name}</h2>
          <p className="text-gray-600 line-clamp-3 mb-4">{description}</p>
  
          {/* Attributes */}
          <div className="flex flex-wrap gap-2 mb-6">
            {attributes.map((attr, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-sm"
              >
                {attr}
              </span>
            ))}
          </div>
  
          <Link 
            to={`/profiles/${id}`}
            className="inline-flex items-center justify-center w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-lg transition-all hover:scale-105 hover:shadow-lg"
          >
            View Full Profile
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
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  };