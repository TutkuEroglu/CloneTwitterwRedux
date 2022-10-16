import React from "react";
import "../AllTweets/Tweets.css";
import ProfileImage from "../../Assets/Images/user.png";
import TweetBtnLists from "../../Lists/TweetBtnLists";
import { formatDate } from "../../Utils/dateFormatter";
import { useSelector, useDispatch } from "react-redux";
import { UpdateTweets } from "../../redux/actions/getTweetsAction";
import { setNotify } from "../../redux/actions/notify";

const Tweets = () => {
  const dispatch = useDispatch();
  const {USERNAME} = useSelector((state) => state?.AUTH);
  const tweet = useSelector((state) => state?.TWEETS);

  const likeTweet = async (TEXTID) => {
    const index = tweet.findIndex((tweet) => tweet.TEXTID === TEXTID);
    if (tweet[index].ISLIKED === 0) {
        const data = {
          TEXTID: TEXTID,
          OWNER: tweet[index].OWNER,
          TEXT: tweet[index].TEXT,
          DATE: tweet[index].DATE,
          ISLIKED: 1,
          LIKEAMOUNT: 1,
          
        };
          dispatch(UpdateTweets(data));
          if (tweet[index].OWNER === USERNAME) {
            dispatch(setNotify(true))
          }
    }  else {
        const data2 = {
          TEXTID: TEXTID,
          OWNER: tweet[index].OWNER,
          TEXT: tweet[index].TEXT,
          DATE: tweet[index].DATE,
          ISLIKED: 0,
          LIKEAMOUNT: 0,
        };
        dispatch(UpdateTweets(data2));
      }
  };
  
  return (
    <>
      {tweet?.map((val) => (
        <div className="TweetContain" key={val?.TEXTID}>
          <div className="TopContain">
            <img
              className="PictureContain"
              src={ProfileImage}
              alt={"PictureContain"}
            />
            <div className="TextContain">
              <span className="textUsernameContain">{val?.OWNER}</span>·
              <span className="textDateContain"> 
                {formatDate(val?.DATE, "isTodayOrTomorrow")}
              </span>
              <br />
              <span className="textTextContain">{val?.TEXT}</span>
            </div>
          </div>

          <div className="BottomContain">
            {TweetBtnLists?.map((val) => (
              <div className="IconContain" title={val?.text} key={val?.id}>
                {val?.icon}
              </div>
            ))}
            <div
              className="IconContain"
              title={"Beğen"}
              onClick={() => {
                likeTweet(val?.TEXTID);
              }}
            >
              <i className={val?.ISLIKED === 0 ? "bi bi-heart heartContain" : "bi bi-heart-fill likedHeartContain"}></i>
 
              <span className={val?.ISLIKED === 0 ? "likeAmountContain" : "likeAmountActiveContain"}>{val.LIKEAMOUNT === 0 ? "" : val.LIKEAMOUNT}</span>

            </div>
            

            <div className="IconContain" title={"Paylaş"}>
              <i className="bi bi-share shareContain"></i>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Tweets;
