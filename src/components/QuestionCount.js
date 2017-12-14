import React from 'react';

function QuestionCount(props) {

  return (
    <div className="questionCount">
      Вопрос <span>{props.counter}</span> из <span>{props.total}</span>
    </div>
  );

}

QuestionCount.propTypes = {
  counter: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired
};

export default QuestionCount;
