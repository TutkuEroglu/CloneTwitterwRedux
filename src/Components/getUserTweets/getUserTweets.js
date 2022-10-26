import React from "react";
import "./getUserTweets.css";
import ProfileImage from "../../Assets/Images/user.png";
import TweetBtnLists from "../../Lists/TweetBtnLists";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../Utils/dateFormatter";
import { updateUserTweets } from "../../redux/actions/getUserTweetsAction";
import { setNotify } from "../../redux/actions/notify";

const GetUserTweets = () => {
  const dispatch = useDispatch();
  const { USERNAME } = useSelector((state) => state?.AUTH);
  const tweets = useSelector((state) => state?.USERTWEETS);

  const likeTweet = async (TEXTID) => {
    const index = tweets.findIndex((tweets) => tweets.TEXTID === TEXTID);
    if (tweets[index].ISLIKED === 0) {
      const data = {
        TEXTID: TEXTID,
        OWNER: tweets[index].OWNER,
        TEXT: tweets[index].TEXT,
        DATE: tweets[index].DATE,
        ISLIKED: 1,
        LIKEAMOUNT: 1,
      };
      dispatch(updateUserTweets(data));
      if (tweets[index].OWNER === USERNAME) {
        dispatch(setNotify(true));
      }
    } else {
      const data2 = {
        TEXTID: TEXTID,
        OWNER: tweets[index].OWNER,
        TEXT: tweets[index].TEXT,
        DATE: tweets[index].DATE,
        ISLIKED: 0,
        LIKEAMOUNT: 0,
      };
      dispatch(updateUserTweets(data2));
    }
  };

  return (
    <>
      {tweets?.map((val) => (
        <div className="TweetArea" key={val?.TEXTID}>
          <div className="TopArea">
            <img
              className="PictureArea"
              src={ProfileImage}
              alt={"ProfilePic"}
            />
            <div className="TextArea">
              <span className="textUsername">{val?.OWNER}</span>·
              <span className="textDate">
                {formatDate(val?.DATE, "isTodayOrTomorrow")}
              </span>
              <br />
              <span className="textText">{val?.TEXT}</span>
            </div>
          </div>

          <div className="BottomArea">
            {TweetBtnLists?.map((val) => (
              <div className="IconArea" title={val?.text} key={val?.id}>
                {val?.icon}
              </div>
            ))}
            <div
              className="IconArea"
              title={"Beğen"}
              onClick={() => {
                likeTweet(val?.TEXTID);
              }}
            >
              <i
                className={
                  val?.ISLIKED === 0
                    ? "bi bi-heart heart"
                    : "bi bi-heart-fill likedHeart"
                }
              ></i>

              <span
                className={
                  val?.ISLIKED === 0 ? "likeAmount" : "likeAmountActive"
                }
              >
                {val.LIKEAMOUNT === 0 ? "" : val.LIKEAMOUNT}
              </span>
            </div>

            <div className="IconArea" title={"Paylaş"}>
              <i className="bi bi-share share"></i>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GetUserTweets;
