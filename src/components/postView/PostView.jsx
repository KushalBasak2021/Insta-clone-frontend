import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import Topbar from "../topbar/Topbar";
import "./postView.css";
import ClipLoader from "react-spinners/ClipLoader";

const PostView = () => {
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      const posts = await axios.get(
        "https://insta-clone-backend-taq7.onrender.com/api/post"
      );
      setLoading(false);
      setAllPosts(posts.data);
    };
    getAllPosts();
  }, []);

  console.log(allPosts);
  return (
    <div className="post-view">
      <Topbar />
      {loading ? (
        <div className="loader">
          <ClipLoader />
        </div>
      ) : (
        <div className="posts">
          {allPosts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostView;
