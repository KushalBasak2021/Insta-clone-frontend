import React, { useEffect, useState } from "react";
import "./post.css";

const Post = ({ post }) => {
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    // assume you have a date string from the API like this:
    const apiDateString = post.date;

    // create a new Date object from the date string
    const date = new Date(apiDateString);

    // format the date using toLocaleDateString()
    const formattedDate = date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // set the state with the formatted date string
    setDateString(formattedDate);
  }, [post.date]);

  console.log(post);
  return (
    <div className="post">
      <div className="post-top">
        <div className="post-top-left">
          <h3>{post.author}</h3>
          <p>{post.location}</p>
        </div>
        <div className="post-top-right">
          <img src={require("../../images/more_icon.png")} alt="" />
        </div>
      </div>
      <div className="post-middle">
        <img src={post.PostImage} alt="" />
      </div>
      <div className="post-bottom">
        <div className="post-about">
          <div className="likes-share">
            <div className="icon">
              <img src={require("../../images/heart.png")} alt="" />
              <img src={require("../../images/share.png")} alt="" />
            </div>
            <p>{post.likes} likes</p>
          </div>
          <p>{dateString}</p>
        </div>
        <h4>{post.description}</h4>
      </div>
    </div>
  );
};

export default Post;
