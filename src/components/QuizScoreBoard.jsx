import { Link } from "react-router-dom";
// show scoreboard after quiz complete
const ScoreBoard = ({ pointsTable, quizUrl }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
                <p className="text-xl mb-2">
                    Your Score: <span className="text-green-500">{pointsTable.current.correct}</span>
                </p>
                <p className="text-xl">
                    Incorrect Answers: <span className="text-red-500">{pointsTable.current.incorrect}</span>
                </p>
                <div className="grid grid-cols-2 gap-7">
                    <Link to={quizUrl}>
                        <button className="bg-red-400 text-white rounded-md hover:bg-red-600 p-4 transition-colors">
                            Try Again
                        </button>
                    </Link>
                    <Link to={"/quizzes"}>
                        <button className="bg-blue-400 text-white rounded-md hover:bg-blue-600 p-4 transition-colors">
                            Quizzes Library
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
    };

    //checks answer
const answerChecker = ({ correctAnswer, selectedAnswer }) => {
    return (
      selectedAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
    );
  };
  
  //indexing options
  const giveABCD = (index) => {
    switch (index) {
      case 0:
        return "a";
      case 1:
        return "b";
      case 2:
        return "c";
      case 3:
        return "d";
      default:
        return "";
    }
  };
  
  export { ScoreBoard, answerChecker, giveABCD };
