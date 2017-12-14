import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function Result(props) {

  return (
    <ReactCSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        <h1>Поздравляем, Вы - 100% сексист!</h1>
        <div className="start">
        <a className="twitter-share-button"
            href="https://twitter.com/intent/tweet?text="
            data-text="Поздравляем, Вы - 100% сексист!"
            data-url="http://vanadium23.me/backend-secret-sexist/"
            data-hashtags="сексизм,заднесерверные"
            data-size="large">
          Tweet</a>
        </div>
      </div>
    </ReactCSSTransitionGroup>
  );

}

Result.propTypes = {
  quizResult: React.PropTypes.string.isRequired,
};

export default Result;
