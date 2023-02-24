import "./App.css";
import LandingPage from "./components/landingPage/LandingPage";
import { Route, Routes } from "react-router-dom";
import PostView from "./components/postView/PostView";
import PostForm from "./components/postForm/PostForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/post-view" element={<PostView />} />
        <Route path="/post-form" element={<PostForm />} />
      </Routes>
    </div>
  );
}

export default App;
