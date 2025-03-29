import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const LandingPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const sliderImages = [
    {
      url: "https://i0.wp.com/www.alphaadventuretreks.com/blog/wp-content/uploads/2022/07/Things-to-do-with-kids-in-Nepal.jpeg?fit=1200%2C700&ssl=1",
      alt: "Mount Everest"
    },
    {
      url: "https://www.oyorooms.com/blog/wp-content/uploads/2018/08/POKHARA-min.jpg",
      alt: "Kathmandu Valley"
    },
    {
      url: "https://basecampadventure.com/wp-content/uploads/2018/07/Kathmandu-Chitwan-Pokhara-Tours-IV-1290x540.jpg",
      alt: "Pokhara Lakeside"
    },
    {
      url: "https://kiwanisaspac.org/wp-content/uploads/2023/10/387448684_982764626286727_5347645499583349038_n.jpg",
      alt: "Nepalese Festival"
    }
  ];

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => {
      setIsMounted(false);
      clearInterval(interval);
    };
  }, [sliderImages.length]);

  // Preload images
  useEffect(() => {
    sliderImages.forEach(image => {
      const img = new Image();
      img.src = image.url;
    });
  }, [sliderImages]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      
      {/* Preload first image */}
      <link rel="preload" href={sliderImages[0].url} as="image" />

      <main className="flex-grow flex flex-col items-center justify-center">
        {/* Hero Slider */}
        <div className="relative w-full h-[70vh] overflow-hidden bg-gray-900">
          {sliderImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover object-center"
                loading="eager" // Changed from lazy
                decoding="async"
                width="1920"
                height="1080"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
            </div>
          ))}

          {/* Slider Content */}
          {isMounted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <div className="max-w-4xl space-y-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-serif leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">
                    The Heart of the Himalayas
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl mx-auto">
                  Discover Nepal's timeless heritage through interactive journeys into its history, culture, and natural wonders
                </p>
              </div>
            </div>
          )}

          {/* Slider Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === activeSlide ? "bg-amber-500 w-8" : "bg-white/30"
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

         {/* Navigation Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4 py-16">
          {[
            { title: "Historical Timeline", to: "/timeline", color: "from-amber-500 to-orange-600" },
            { title: "Hall of Fame", to: "/hall-of-fame", color: "from-teal-500 to-emerald-600" },
            { title: "Knowledge Quizzes", to: "/quizzes", color: "from-blue-500 to-indigo-600" },
            { title: "Contribute Updates", to: "/update-requests", color: "from-purple-500 to-fuchsia-600" },
          ].map((item, index) => (
            <Link 
              key={index}
              to={item.to}
              className="group relative h-48 rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90`} />
              <div className="relative h-full flex items-center justify-center p-6">
                <h3 className="text-2xl font-bold text-white text-center tracking-wide group-hover:translate-y-[-5px] transition-transform">
                  {item.title}
                </h3>
              </div>
              <div className="absolute inset-0 border-2 border-white/20 rounded-2xl group-hover:border-white/40 transition-all" />
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;