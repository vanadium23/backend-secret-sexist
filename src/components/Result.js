import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

function Result(props) {

  const {
    FacebookShareButton,
    TwitterShareButton,
    VKShareButton,
  } = ShareButtons;

  const TwitterIcon = generateShareIcon('twitter');
  const FacebookIcon = generateShareIcon('facebook');
  const VKShareIcon = generateShareIcon('vk');

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
        <div className="social">
          <TwitterShareButton
            url={"http://vanadium23.me/backend-secret-sexist/"}
            title={"Поздравляем, Вы - 100% сексист!"}
            hashtags={["сексизм","заднесерверные"]}
          >
            <TwitterIcon size={64} round={true} />
          </TwitterShareButton>
          <FacebookShareButton
            url={"http://vanadium23.me/backend-secret-sexist/"}
            quote={"Поздравляем, Вы - 100% сексист!"}
          >
            <FacebookIcon size={64} round={true} />
          </FacebookShareButton>
          <VKShareButton
            url={"http://vanadium23.me/backend-secret-sexist/"}
            title={"Поздравляем, Вы - 100% сексист!"}
          >
            <VKShareIcon size={64} round={true} />
          </VKShareButton>
        </div>
      </div>
    </ReactCSSTransitionGroup>
  );

}

Result.propTypes = {
  quizResult: React.PropTypes.string.isRequired,
};

export default Result;
