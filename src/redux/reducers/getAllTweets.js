import { SAVE_TWEETS, DEL_TWEETS, UPDATE_TWEETS, NEW_TWEETS } from "../actions/getTweetsAction";
import { removeStorage, setStorage, getStorage } from "../../localStorage";

const tweet = getStorage("alltweets");

const initialState = tweet ?  tweet  :  [] ;

const getAllTweets = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TWEETS:
      const index = state.findIndex(state => state.TEXTID === action.payload.TEXTID);
      const updatedTweet = [...state];
      updatedTweet[index] = action.payload
      return updatedTweet

    case NEW_TWEETS:
      setStorage("alltweets", [...state, action.payload]);
      const newTweet = [...state];
      newTweet.splice(0, 0, action.payload);
      return newTweet;

    case SAVE_TWEETS:
      setStorage("alltweets", [...state, action.payload]);
      return {
        ...state,
        tweet: [...state, action.payload],
      };
    case DEL_TWEETS:
      removeStorage("alltweets");
      return [];
    default:
      return state;
  }
};

export default getAllTweets;
