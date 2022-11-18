import { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { QuizContext } from '../contexts/QuizContext';

const Question = ({question, answers, number}) => {
  let { userAnswers, setUserAnswers } = useContext(QuizContext);
  const handleOnAnswer = e => {
    userAnswers.push(e.target.value);
    setUserAnswers(userAnswers);
  };

  const answer = answers.map((a, i) => (
    <span class="container" key={i}>
      <input
        type='radio'
        id={a}
        value={a}
        name={number}
        onClick={handleOnAnswer}>
      </input>
      <label class="checkmark" htmlFor={a}>{a}</label>
    </span>
))
  return (
    <div>
      <Card className="question-card">
        <Card.Body className="main">
          <div class="quiz-q">{question}</div><br/>
          <div class="quiz-grid"> {answer} </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Question;
