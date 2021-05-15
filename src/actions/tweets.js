import { saveLikeToggle, saveTweet } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const ADD_TWEET = 'ADD_TWEET';
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';

function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet,
  };
}

export function handleAddTweet(text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveTweet({
      text,
      author: authedUser,
      replyingTo,
    })
      .then((tweet) => {
        dispatch(addTweet(tweet));
      })
      .then(() => {
        dispatch(hideLoading());
      });
  };
}

export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  };
}

function toggleTweet({ id, hasLiked, authedUser }) {
  return {
    type: TOGGLE_TWEET,
    id,
    hasLiked,
    authedUser,
  };
}

export function handleToggleTweet(info) {
  return (dispatch) => {
    // Using optimistic update here:
    // First update the UI
    dispatch(toggleTweet(info));

    // Then call the backend
    return saveLikeToggle(info).catch((error) => {
      console.warn('Error in handleToggleTweet: ', error);
      dispatch(toggleTweet(info));
      alert('There was an error liking the tweet. Try again.');
    });
  };
}
