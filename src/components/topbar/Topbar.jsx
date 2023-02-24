import React from "react";
import { Link } from "react-router-dom";
import "./topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <Link to="/post-view" style={{ textDecoration: "none" }}>
        <div className="topbar-left">
          <img src={require("../../images/icon.png")} alt="" />
          <h2>Instaclone</h2>
        </div>
      </Link>
      <div className="topbar-right">
        <Link to="/post-form">
          <img src={require("../../images/camera.png")} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
