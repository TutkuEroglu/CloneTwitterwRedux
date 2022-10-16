import "./SendTweet.css";
import React, { useState } from "react";
import ButtonList from "../../Lists/ButtonLists";
import ProfileImage from "../../Assets/Images/user.png";
import { useDispatch, useSelector } from "react-redux";
import { newTweets } from "../../redux/actions/getTweetsAction";
import { formatDate } from "../../Utils/dateFormatter"
import { newUserTweets } from "../../redux/actions/getUserTweetsAction"

const SendTweet = () => {
  const { USERNAME } = useSelector((state) => state.AUTH);
  const dispatch = useDispatch();

  const [text, setText] = useState("")
  const [textid, setTextID] = useState(0)
  const [usertextid, setUserTextID] = useState(1)

  const tweet = (e) => {
    if (text === "") {
      alert("boş twit atamazsın!")
    } else {
      e.preventDefault();
      const today = new Date();
      const date = formatDate(today, "withHour")
      setTextID(textid+1)
      setUserTextID(usertextid+1)
      dispatch(newTweets({TEXTID:textid+1,TEXT:text,OWNER:USERNAME,DATE:date,LIKEAMOUNT:0,ISLIKED:0})); 
      dispatch(newUserTweets({TEXTID:usertextid+1,TEXT:text,OWNER:USERNAME,DATE:date,LIKEAMOUNT:0,ISLIKED:0})); 
      setText("")
    }
  };

  return (
    <>
      <div className="SendTweetContainer">
        <div className="TopTweetContainer">
          <img className="UserPicture" src={ProfileImage} alt={"Profile"} />
          <input
            placeholder="Neler oluyor?"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>
        <div className="BottomTweetContainer">
          <div className={"IconsWrapper"}>
            {ButtonList.map((val) => (
              <div className="TweetIcons" title={val.text} key={val.id}>
                {val.icon}
              </div>
            ))}
          </div>
          <div className="TweetSendBtn">
            <button type="button" className="btn btn-primary btnPrimary" onClick={tweet}>
              Tweetle
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendTweet;
