import { saveLikeToggle } from '../utils/api';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';

export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  };
}

function toggleTweet({ id, hasLiked, authedUser }) {
  return {
    TOGGLE_TWEET,
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
