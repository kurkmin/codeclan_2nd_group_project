import React, { useState, useEffect } from 'react';
import Feedback from '../components/quiz/Feedback';
import Questions from '../components/quiz/Questions';
import PlanetSelector from '../components/solar/PlanetSelector';

function QuizContainer({ planets, planet, getSelectedPlanet }) {

  const [quizzes, setQuizzes] = useState([]);
  const [constructedQuizzes, setConstructedQuizzes] = useState([]);
  const [answerBoolean, setAnswerBoolean] = useState(null);

  const answerPaths = [ planet.gravity, planet.name, planet.moons, planet.meanRadius, planet.density]

  const handleSubmit = (submittedAnswer) => {
    const question_check = quizzes.find((quiz, index) => quiz.index === submittedAnswer.questionId)
    let index = submittedAnswer.questionId
   
    if (answerPaths[index] == submittedAnswer.inputAnswer) {
      setAnswerBoolean(true)

    }
    else {
      setAnswerBoolean(false)
    }
  }

  // const answer2 = planet.className
  // //const answer3 = check moons function
  // etc

  const planetName = planet.englishName
  const quizList = quizzes.map((quiz) => {
    return (
      quiz.question + planetName + "?"
    )
  })


  // const questionOneCheck = () {
  //   if (quiz[0]. )
  // }


  function getQuizzes() {
    fetch('http://localhost:9000/api/quizzes')
      .then(res => res.json())
      .then(data => setQuizzes(data))
      .then(setConstructedQuizzes(quizList))
  }

  useEffect(() => {
    getQuizzes();
  }, []);

  useEffect(() => {
    setConstructedQuizzes(quizList)
  }, [planet]);


  return (
    <section className='container container-quiz'>
      <h1>I'm the quiz container</h1>
      <PlanetSelector planets={planets} getSelectedPlanet={getSelectedPlanet} />
      <Questions handleSubmit={handleSubmit} answerBoolean={answerBoolean} planets={planets} planet={planet}
        quizzes={constructedQuizzes} />
      <Feedback quizzes={quizzes} answerBoolean={answerBoolean} />
    </section>
  )

}

export default QuizContainer;