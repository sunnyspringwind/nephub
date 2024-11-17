import { useRef, useState } from "react";
import { ScoreBoard, answerChecker, giveABCD } from "./QuizScoreBoard";

const quizData = [
  {
    question: "When was Nepal declared a federal democratic republic?",
    options: ["2006", "2008", "2010", "2012"],
    correctAnswer: "2008",
  },
  {
    question: "Who was the first King of unified Nepal?",
    options: [
      "Prithvi Narayan Shah",
      "Tribhuvan Bir Bikram Shah",
      "Mahendra Bir Bikram Shah",
      "Gyanendra Bir Bikram Shah",
    ],
    correctAnswer: "Prithvi Narayan Shah",
  },
  {
    question: "Which year did Nepal become a member of the United Nations?",
    options: ["1955", "1960", "1965", "1970"],
    correctAnswer: "1955",
  },
  {
    question: "When was the first democratic election held in Nepal?",
    options: ["1959", "1962", "1965", "1968"],
    correctAnswer: "1959",
  },
  {
    question: "When was the Sugauli Treaty signed?",
    options: ["1815", "1816", "1817", "1818"],
    correctAnswer: "1816",
  },
  {
    question: "Who is known as the 'Iron Man' of Nepal?",
    options: [
      "Bhimsen Thapa",
      "Jung Bahadur Rana",
      "Chandra Shumsher",
      "Madan Bhandari",
    ],
    correctAnswer: "Jung Bahadur Rana",
  },
  {
    question: "When was the Kot Massacre?",
    options: ["1846", "1850", "1854", "1858"],
    correctAnswer: "1846",
  },
  {
    question: "Which year did Nepal adopt its first written constitution?",
    options: ["1948", "1951", "1959", "1962"],
    correctAnswer: "1948",
  },
  {
    question: "When was the People's Movement I (Jana Andolan I)?",
    options: ["1989", "1990", "1991", "1992"],
    correctAnswer: "1990",
  },
  {
    question: "Who was the first President of Nepal?",
    options: [
      "Ram Baran Yadav",
      "Bidya Devi Bhandari",
      "Girija Prasad Koirala",
      "Sushil Koirala",
    ],
    correctAnswer: "Ram Baran Yadav",
  },
];

const QuizAboutNepal = () => {
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

export default QuizAboutNepal;
