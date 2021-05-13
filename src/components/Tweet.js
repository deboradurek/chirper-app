import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti';
import { handleToggleTweet } from '../actions/tweets';

class Tweet extends Component {
  handleLike = (e) => {
    e.preventDefault();

    const { dispatch, tweet, authedUser } = this.props;

    dispatch(
      handleToggleTweet({
        id: tweet.id,
        hasLiked: tweet.hasLiked,
        authedUser,
      })
    );
  };

  toParent = (e, id) => {
    e.preventDefault();
    // todo: redirect to parent tweet
  };

  render() {
    const { tweet } = this.props;

    if (tweet === null) {
      return <p>This Tweet doesn't exist!</p>;
    }

    const { avatar, name, timestamp, text, likes, hasLiked, replies, parent } = tweet;

    return (
      <div className="tweet">
        <div>
          <img src={avatar} alt={`Avatar of ${name}`} className="avatar"></img>
        </div>
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button className="replying-to" onClick={(e) => this.toParent(e, parent.id)}>
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked === true ? (
                <TiHeartFullOutline className="tweet-icon" color="#e0245e" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, tweets }, { id }) {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  return {
    authedUser,
    tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null,
  };
}

export default connect(mapStateToProps)(Tweet);
