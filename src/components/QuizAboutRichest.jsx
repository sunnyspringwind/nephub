import { useRef, useState } from "react";
import { ScoreBoard, answerChecker, giveABCD } from "./QuizScoreBoard";


const quizData = [
    {
        question: "Who is the richest person in Nepal?",
        options: ["Binod Chaudhary", "Shesh Ghale", "Upendra Mahato", "Ajay Sumargi"],
        correctAnswer: "Binod Chaudhary",
    },
    {
        question: "Which industry is Binod Chaudhary primarily associated with?",
        options: ["Banking", "Real Estate", "Food and Beverage", "Telecommunications"],
        correctAnswer: "Food and Beverage",
    },
    {
        question: "Who is the founder of the MIT Group Foundation?",
        options: ["Shesh Ghale", "Binod Chaudhary", "Upendra Mahato", "Ajay Sumargi"],
        correctAnswer: "Shesh Ghale",
    },
    {
        question: "Which Nepali billionaire is known for his investments in Russia?",
        options: ["Upendra Mahato", "Binod Chaudhary", "Shesh Ghale", "Ajay Sumargi"],
        correctAnswer: "Upendra Mahato",
    },
    {
        question: "Who is the founder of Muktishree Pvt. Ltd.?",
        options: ["Ajay Sumargi", "Binod Chaudhary", "Shesh Ghale", "Upendra Mahato"],
        correctAnswer: "Ajay Sumargi",
    },
    {
        question: "Which Nepali billionaire has significant investments in the telecommunications sector?",
        options: ["Ajay Sumargi", "Binod Chaudhary", "Shesh Ghale", "Upendra Mahato"],
        correctAnswer: "Ajay Sumargi",
    },
    {
        question: "Who is the first Nepali to be listed on the Forbes Billionaires list?",
        options: ["Binod Chaudhary", "Shesh Ghale", "Upendra Mahato", "Ajay Sumargi"],
        correctAnswer: "Binod Chaudhary",
    },
    {
        question: "Which Nepali billionaire is also a former president of the Non-Resident Nepali Association (NRNA)?",
        options: ["Upendra Mahato", "Binod Chaudhary", "Shesh Ghale", "Ajay Sumargi"],
        correctAnswer: "Upendra Mahato",
    },
    {
        question: "Who is the co-founder of the Melbourne Institute of Technology in Australia?",
        options: ["Shesh Ghale", "Binod Chaudhary", "Upendra Mahato", "Ajay Sumargi"],
        correctAnswer: "Shesh Ghale",
    },
    {
        question: "Which Nepali billionaire has a significant presence in the hospitality industry?",
        options: ["Binod Chaudhary", "Shesh Ghale", "Upendra Mahato", "Ajay Sumargi"],
        correctAnswer: "Binod Chaudhary",
    },
];

const QuizAboutRichest = () => {
  const pointsTableRef = useRef({ correct: 0, incorrect: 0 });
  const questionRefs = useRef([]);
  const [isResultVisble, setIsResultVisible] = useState(false);


  //hides the question after answered
  const unmountQuestion = (refIndex) => {
    questionRefs.current[refIndex].classList.toggle("hidden");
  };

  const tryAgain = () =>{
    //reset result visibility and points value and toggle hidden class off
    setIsResultVisible(false);
    pointsTableRef.current.correct = 0;
    pointsTableRef.current.incorrect = 0;
    questionRefs.current.map(question=>{
     question.classList.toggle("hidden");
    })
  }

  const displayResult = () => {
    if (pointsTableRef.current.correct + pointsTableRef.current.incorrect == 10)
      setIsResultVisible(true);
  };


  return (
    <div className="p-6 bg-gray-100 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Nepal Quiz</h2>
      {quizData.map((item, qIndex) => (
        <div
          key={qIndex}
          ref={(el) => (questionRefs.current[qIndex] = el)}
          className="flex flex-col bg-white shadow-md rounded-lg p-6 mb-4 w-full max-w-2xl"
        >
          <h2 className="text-xl font-semibold mb-4">{`${qIndex + 1}) ${item.question}`}</h2>
          <div>
            <ul className="grid grid-cols-2 gap-4">
              {item.options.map((option, index) => (
                <li
                  key={index}
                  className="bg-blue-500 text-white p-3 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                  onClick={() => {
                    answerChecker({
                      correctAnswer: item.correctAnswer,
                      selectedAnswer: option,
                    })
                      ? pointsTableRef.current.correct++
                      : pointsTableRef.current.incorrect++;

                    unmountQuestion(qIndex);
                    displayResult();
                  }}
                >
                  <span className="font-bold">{`${giveABCD(index)})`}</span> {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      {isResultVisble && <ScoreBoard pointsTable={pointsTableRef} tryAgain={tryAgain}/>}
    </div>
  );
};

export default QuizAboutRichest;
