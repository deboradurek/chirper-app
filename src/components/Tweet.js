import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatTweet } from '../utils/helpers';

class Tweet extends Component {
  render() {
    console.log(this.props);

    return <div className="tweet"></div>;
  }
}

function mapStateToProps({ authedUser, users, tweets }, { id }) {
  const tweet = tweets[id];
  const parentTweet = tweets[tweet.replyingTo];

  return {
    authedUser,
    tweet: formatTweet(tweet, users[tweet.author], authedUser, parentTweet),
  };
}

export default connect(mapStateToProps)(Tweet);
