import React from 'react';
import { 
  MountainIcon, 
  BookOpenIcon, 
  TrophyIcon, 
  UsersIcon, 
  ClipboardListIcon 
} from 'lucide-react';
import Footer from './Footer';
import Header from './Header';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
     <Header/>
      <div className="h-16"></div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-red-500/30">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-white mb-6 border-b-2 border-red-500 pb-4">
              Nepal Knowledge Hub: Your Gateway to Nepali Culture and History
            </h1>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <MountainIcon className="mr-3 text-red-500" />
                  <h2 className="text-xl font-semibold text-white">Our Mission</h2>
                </div>
                <p className="text-gray-300">
                  Nepal Chronicles is dedicated to creating an engaging, comprehensive platform that brings the rich history, culture, and achievements of Nepal to a global audience. We aim to educate, inspire, and connect people through interactive and informative content.
                </p>
              </div>

              <div className="bg-slate-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <BookOpenIcon className="mr-3 text-red-500" />
                  <h2 className="text-xl font-semibold text-white">Who We Are</h2>
                </div>
                <p className="text-gray-300">
                  Created by a passionate individual who believes in the power of technology to preserve and share cultural knowledge, this platform is the result of countless hours of research, design, and development dedicated to showcasing Nepal's incredible story.
                </p>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-red-500">What You'll Find Here</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center text-gray-300">
                  <TrophyIcon className="mr-3 text-red-500" />
                  Interactive Hall of Fame
                </div>
                <div className="flex items-center text-gray-300">
                  <ClipboardListIcon className="mr-3 text-red-500" />
                  Engaging Cultural Quizzes
                </div>
                <div className="flex items-center text-gray-300">
                  <UsersIcon className="mr-3 text-red-500" />
                  Community-Driven Updates
                </div>
              </div>
            </div>

            <div className="text-center">
              <blockquote className="italic text-xl text-gray-400 mb-6">
                "Discover the stories that shape a nation"
              </blockquote>
              
              <p className="text-gray-300 mb-6">
                Whether you're a history enthusiast, a proud Nepali, or simply curious about this remarkable country, Nepal Chronicles offers a unique window into the heart of Nepal's culture, achievements, and rich heritage.
              </p>

              <div className="flex justify-center space-x-4">
                <a 
                  href="/contribute" 
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-md hover:from-red-600 hover:to-red-800 transition duration-300 shadow-md"
                >
                  Contribute to Our Story
                </a>
                <a 
                  href="/quizzes" 
                  className="px-6 py-3 text-white font-medium rounded-md border border-red-500 hover:bg-red-500/10 transition duration-300"
                >
                  Take a Quiz
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="h-16">
        <Footer/>
      </div>
    </div>
  );
};

export default AboutPage;