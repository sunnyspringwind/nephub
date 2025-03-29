import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { fetchData } from "../utils/api";
import DynamicQuiz from "./DynamicQuiz";

const QuizCard = ({ quiz, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const {
    title,
    description,
    category,
    difficulty,
    questionsCount,
    link,
    bgColor,
  } = quiz;

  const cardColors = {
    history: "from-amber-500 to-orange-600",
    influencer: "from-teal-500 to-emerald-600",
    geography: "from-blue-500 to-indigo-600",
    ranking: "from-pink-500 to-rose-600",
    entertainment: "from-indigo-500 to-violet-600",
    politics: "from-red-500 to-red-700",
    internationalRelations: "from-green-500 to-green-700",
    general: "from-gray-500 to-gray-700",
  };

  const difficultyBadgeColors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-amber-100 text-amber-800",
    hard: "bg-red-100 text-red-800",
  };

  return (
    <div
      className="relative w-72 h-96 perspective-1000 m-4 cursor-pointer group"
      style={{
        opacity: 1,
        transform: `translateY(0px)`,
        transition: "all 0.4s ease",
        transitionDelay: `${index * 80}ms`,
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`absolute w-full h-full transition-all duration-500 preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className={`absolute w-full h-full rounded-xl shadow-xl backface-hidden overflow-hidden bg-gradient-to-br ${
            cardColors[category] || "from-purple-500 to-indigo-600"
          }`}
        >
          <div className="flex flex-col justify-between h-full p-6 text-white">
            <div>
              <span
                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${difficultyBadgeColors[difficulty]}`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
              <h3 className="mt-4 text-2xl font-bold">{title}</h3>
              <div className="mt-2 w-16 h-1 bg-white rounded-full opacity-70"></div>
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-75">
                  {questionsCount} questions
                </span>
                <span className="text-sm opacity-75">{category}</span>
              </div>
              <div className="mt-4 text-sm text-white/80">
                Click to learn more
              </div>
            </div>
          </div>

          {/* Card decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
            <svg viewBox="0 0 100 100" fill="white">
              <circle cx="75" cy="25" r="20" />
              <circle cx="75" cy="75" r="10" />
              <circle cx="25" cy="75" r="15" />
            </svg>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full rounded-xl shadow-xl backface-hidden overflow-hidden bg-white rotate-y-180 p-6"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex flex-col h-full">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="mt-4 text-gray-600 flex-grow">{description}</p>

            <div className="mt-auto">
              {link ? (
                <Link to={link} onClick={(e) => e.stopPropagation()}>
                  <button className="w-full px-4 py-3 font-medium text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors">
                    Start Quiz
                  </button>
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full px-4 py-3 font-medium text-gray-500 rounded-lg bg-gray-200 cursor-not-allowed"
                >
                  Coming Soon
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          activeCategory === "all"
            ? "bg-indigo-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => setActiveCategory("all")}
      >
        All Categories
      </button>

      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActiveCategory(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

const QuizLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  const [quizSet, setQuizSet] = useState();
  const [businessQuizSet, setBusinessQuizSet] = useState();

  useEffect(() => {
    // Simulate loading and reveal animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const filterByCategory = (data, category) => {
    if (!Array.isArray(data)) {
      console.error("Invalid data format. Expected an array.");
      return [];
    }
    return data.filter((item) => item.category === category);
  };

  // setBusinessQuizSet(filterByCategory(quizSet, "business"));

  // Expanded quiz data with additional details
  const quizzes = [
    {
      id: 1,
      title: "Discover Nepal",
      description:
        "Test your knowledge about Nepal's rich natural beauty, breathtaking landmarks, and fascinating views in this comprehensive quiz.",
      category: "geography",
      difficulty: "medium",
      questionsCount: 10,
      link: "/quizzes/about-nepal",
    },
    {
      id: 2,
      title: "Billionaires & Business",
      description:
        "Learn about the Nepal's wealthiest individuals, their businesses, and the strategies that helped them build their fortunes.",
      category: "ranking",
      difficulty: "hard",
      questionsCount: 15,
      link: "/quizzes/about-richest",
    },
    {
      id: 3,
      title: "Nepali Social Norms",
      description:
        "This quiz covers Nepali etiquette, social behaviors, gestures, customs, and common phrases perfect for someone wanting to understand how Nepali people interact in everyday life.",
      category: "general",
      difficulty: "easy",
      questionsCount: 15,
      link: "/quizzes/nepali-norms",
    },
    {
      id: 4,
      title: "Musical Masterminds",
      description:
        "From classical composers to modern pop stars, test your knowledge of music history, theory, and famous artists of Nepal.",
      category: "entertainment",
      difficulty: "easy",
      questionsCount: 15,
      link: "/quizzes/music",
    },
    {
      id: 5,
      title: "Screen Legends",
      description:
        "How well do you know your movies and TV shows? Test your knowledge of famous lines, actors, and behind-the-scenes facts of Nepalese movies.",
      category: "entertainment",
      difficulty: "medium",
      questionsCount: 15,
      link: "/quizzes/movies",
    },
    {
      id: 6,
      title: "Nepal in Global Affairs",
      description:
        "Explore Nepal's role in global diplomacy, international organizations, and key treaties through this quiz on international relations.",
      category: "international relations",
      difficulty: "hard",
      questionsCount: 10,
      link: "/quizzes/nepal-international-relations",
    },
    {
      id: 7,
      title: "Nepal History",
      description:
        "Journey through time and test your knowledge of major historical events, figures of Nepal.",
      category: "history",
      difficulty: "medium",
      questionsCount: 20,
      link: "/quizzes/nepal-history",
    },
    {
      id: 8,
      title: "Ancient Civilizations",
      description:
        "Explore the mysteries of ancient Egypt, Greece, Rome, China, and more in this historical deep dive.",
      category: "history",
      difficulty: "hard",
      questionsCount: 12,
      link: null,
    },
  ];

  // Extract unique categories for the filter
  const categories = [...new Set(quizzes.map((quiz) => quiz.category))];

  // Filter quizzes based on search term and active category
  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeCategory === "all" || quiz.category === activeCategory)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div
        className="container mx-auto px-4 py-8 mb-16"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
        }}
      >
        {/* Hero section */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Challenge Your Knowledge
          </h1>
          <p className="text-lg text-gray-600">
            Discover our collection of interactive quizzes designed to
            entertain, challenge, and expand your understanding of the Nepal.
          </p>

          {/* Search */}
          <div className="mt-8 relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search quizzes..."
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category filters */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Quiz cards grid */}
        <div className="flex flex-wrap justify-center">
          {filteredQuizzes.map((quiz, index) => (
            <QuizCard key={quiz.id} quiz={quiz} index={index} />
          ))}

          {filteredQuizzes.length === 0 && (
            <div className="w-full text-center py-16">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No quizzes found
              </h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <button
                className="mt-4 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default QuizLibrary;
