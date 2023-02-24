import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import Topbar from "../topbar/Topbar";
import "./postView.css";

const PostView = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      const posts = await axios.get("http://localhost:5000/api/post");
      setAllPosts(posts.data);
    };
    getAllPosts();
  }, []);

  console.log(allPosts);
  return (
    <div className="post-view">
      <Topbar />
      <div className="posts">
        {allPosts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostView;
