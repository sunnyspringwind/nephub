import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

// Main Quiz Component
const DynamicQuiz = ({ quizApi = [], quizTitle = "Quiz", timeLimit = 0 }) => {
  const { category } = useParams();

  const [quizData, setQuizData] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const timerRef = useRef(null);

  const categoryMapping = {
    "about-nepal": "geography",
    "about-richest": "ranking",
    "nepali-norms": "general",
    "music": "entertainment",
    "movies": "entertainment",
    "nepal-international-relations": "international relations",
    "nepal-history": "history",
  };

  useEffect(() => {
    setQuizData(quizApi.filter(
      (quiz) => quiz.category.toLowerCase() === categoryMapping[category]
    ))
  }, [category, quizApi]);


  // Initialize or reset timer when quiz starts/restarts
  useEffect(() => {
    if (timeLimit > 0 && !quizCompleted && quizData && quizData.length > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            if (!quizCompleted) handleQuizCompletion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLimit, quizCompleted, quizData]);

  // Format time remaining into minutes and seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Check if the selected answer is correct
  const checkAnswer = (selectedOption, correctAnswer) => {
    return selectedOption === correctAnswer;
  };

  // Calculate the final score
  const calculateScore = () => {
    let correct = 0;
    let incorrect = 0;

    if (!quizData) return { correct, incorrect };

    Object.keys(selectedAnswers).forEach((qIndex) => {
      if (
        checkAnswer(selectedAnswers[qIndex], quizData[qIndex].correctAnswer)
      ) {
        correct++;
      } else {
        incorrect++;
      }
    });

    return { correct, incorrect };
  };

  // Handle selecting an answer
  const handleSelectAnswer = (option) => {
    if (selectedAnswers[currentQuestionIndex] !== undefined || !quizData) return;

    const newAnswers = { ...selectedAnswers };
    newAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(newAnswers);

    // Auto advance after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else if (Object.keys(newAnswers).length === quizData.length) {
        handleQuizCompletion();
      }
    }, 500);
  };

  // Handle quiz completion
  const handleQuizCompletion = () => {
    clearInterval(timerRef.current);
    setQuizCompleted(true);
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);
  };

  // Navigate to specific question
  const goToQuestion = (index) => {
    if (!quizData) return;
    if (index >= 0 && index < quizData.length) {
      setCurrentQuestionIndex(index);
    }
  };

  // Restart the quiz
  const restartQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setShowResults(false);
    setTimeRemaining(timeLimit);
    setScore({ correct: 0, incorrect: 0 });
  };

  // Get letter for option (A, B, C, D)
  const getOptionLetter = (index) => {
    return String.fromCharCode(65 + index);
  };

  // Render loading or error state if no quiz data
  if (!quizData || !Array.isArray(quizData) || quizData.length === 0) {
    return (
      <div className="flex items-center justify-center p-6 bg-red-50 rounded-xl shadow-lg">
        <p className="text-red-600 text-lg font-medium">
          No quiz data available. Please provide valid quiz questions.
        </p>
      </div>
    );
  }

  // Current question data
  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg">
      {!showResults ? (
        <>
          {/* Header Section */}
          <div className="w-full flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-800">{quizTitle}</h1>
            {timeLimit > 0 && (
              <div
                className={`px-4 py-2 rounded-full font-mono text-lg ${
                  timeRemaining < 30
                    ? "bg-red-100 text-red-600"
                    : "bg-indigo-100 text-indigo-600"
                }`}
              >
                {formatTime(timeRemaining)}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / quizData.length) * 100
                }%`,
              }}
            />
          </div>

          {/* Question Navigation */}
          <div className="w-full flex gap-2 flex-wrap mb-6">
            {quizData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all 
                  ${
                    currentQuestionIndex === index
                      ? "bg-indigo-600 text-white"
                      : selectedAnswers[index] !== undefined
                      ? checkAnswer(
                          selectedAnswers[index],
                          quizData[index].correctAnswer
                        )
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-red-100 text-red-700 border border-red-300"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Current Question */}
          {currentQuestion && (
            <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                <span className="text-indigo-600 font-bold mr-2">
                  {currentQuestionIndex + 1}.
                </span>
                {currentQuestion.question}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentQuestion.options &&
                  currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectAnswer(option)}
                      className={`p-4 rounded-lg text-left transition-all flex items-center
                      ${
                        selectedAnswers[currentQuestionIndex] === option
                          ? checkAnswer(option, currentQuestion.correctAnswer)
                            ? "bg-green-100 border-2 border-green-500 text-green-800"
                            : "bg-red-100 border-2 border-red-500 text-red-800"
                          : "bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-100 text-gray-800 hover:border-indigo-300"
                      }`}
                      disabled={
                        selectedAnswers[currentQuestionIndex] !== undefined
                      }
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full mr-3 bg-indigo-200 text-indigo-800 font-bold">
                        {getOptionLetter(index)}
                      </span>
                      <span className="font-medium">{option}</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="w-full flex justify-between">
            <button
              onClick={() => goToQuestion(currentQuestionIndex - 1)}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentQuestionIndex === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
              }`}
            >
              Previous
            </button>

            <button
              onClick={() => {
                if (currentQuestionIndex < quizData.length - 1) {
                  goToQuestion(currentQuestionIndex + 1);
                } else {
                  handleQuizCompletion();
                }
              }}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all"
            >
              {currentQuestionIndex === quizData.length - 1
                ? "Finish Quiz"
                : "Next"}
            </button>
          </div>
        </>
      ) : (
        /* Results Section */
        <div className="w-full bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-800">
            Quiz Results
          </h2>

          {/* Score Display */}
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={
                    score.correct / quizData.length >= 0.7
                      ? "#4ade80"
                      : score.correct / quizData.length >= 0.4
                      ? "#facc15"
                      : "#ef4444"
                  }
                  strokeWidth="10"
                  strokeDasharray={`${
                    2 * Math.PI * 45 * (score.correct / quizData.length)
                  } ${
                    2 * Math.PI * 45 * (1 - score.correct / quizData.length)
                  }`}
                  strokeDashoffset={2 * Math.PI * 45 * 0.25}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{score.correct}</span>
                <span className="text-gray-500">out of {quizData.length}</span>
              </div>
            </div>
          </div>

          {/* Performance Message */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-2">
              {score.correct / quizData.length >= 0.8
                ? "Excellent!"
                : score.correct / quizData.length >= 0.6
                ? "Well done!"
                : score.correct / quizData.length >= 0.4
                ? "Good effort!"
                : "Keep practicing!"}
            </h3>
            <p className="text-gray-600">
              You answered {score.correct} out of {quizData.length} questions
              correctly.
            </p>
          </div>

          {/* Answer Review */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-indigo-700">
              Answer Review
            </h3>
            <div className="space-y-4">
              {quizData.map((question, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-50">
                  <p className="font-medium mb-2">
                    {index + 1}. {question.question}
                  </p>
                  <div className="flex flex-col gap-2">
                    <div
                      className={`p-2 rounded ${
                        selectedAnswers[index] === question.correctAnswer
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <span className="font-medium">Your answer: </span>
                      {selectedAnswers[index] || "Not answered"}
                    </div>
                    {selectedAnswers[index] !== question.correctAnswer && (
                      <div className="p-2 rounded bg-green-100 text-green-800">
                        <span className="font-medium">Correct answer: </span>
                        {question.correctAnswer}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={restartQuiz}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicQuiz;