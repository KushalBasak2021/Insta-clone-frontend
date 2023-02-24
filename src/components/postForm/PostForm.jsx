import React, { useRef, useState } from "react";
import Topbar from "../topbar/Topbar";
import "./postForm.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import axios from "axios";

const PostForm = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [inputs, setInputs] = useState({});
  const [inputFile, setInputFile] = useState(null);
  const [filePath, setFilePath] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  function handleFileSelect(event) {
    const file = event.target.files[0];
    setInputFile(file);
    if (file) {
      setFilePath(file.name); // use file.path to get the local path
    }
  }

  //   console.log(inputs, inputFile);

  function handleSubmit(e) {
    e.preventDefault();
    setIsPosting(true);
    let newPost = {
      ...inputs,
    };

    console.log(newPost);
    const fileName = new Date().getTime() + inputFile.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, inputFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          newPost = { ...newPost, PostImage: downloadURL, date: new Date() };
          console.log(newPost);
          const postBlog = async () => {
            try {
              await axios.post(
                "https://insta-clone-backend-taq7.onrender.com/api/post",
                newPost
              );
              setIsPosting(false);
              window.location.replace("/");
            } catch (err) {
              console.log(err);
            }
          };
          postBlog();
        });
      }
    );
  }

  return (
    <div className="post-form">
      <Topbar />
      <form className="form" onSubmit={handleSubmit}>
        <div className="image-input">
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileSelect}
            ref={fileInputRef}
          />
          <input type="text" value={filePath} className="file-path" readOnly />
          <label htmlFor="fileInput">
            <button onClick={() => fileInputRef.current.click()}>Browse</button>
          </label>
        </div>
        <div className="author-location">
          <input
            type="text"
            id="author"
            placeholder="Author"
            name="author"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="location"
            placeholder="Location"
            name="location"
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          id="description"
          placeholder="Description"
          name="description"
          onChange={handleChange}
          required
        />
        <button className="post-button" type="submit">
          {isPosting ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
