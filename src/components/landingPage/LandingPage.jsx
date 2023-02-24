import React from "react";
import "./landingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="home-image">
        <img src={require("../../images/home.png")} alt="" />
      </div>
      <div className="right">
        <h2>10x Team 04</h2>
        <Link to="/post-view">
          <button>Enter</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
