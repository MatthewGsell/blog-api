import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./mainmodules/signup";
import Posts from "./mainmodules/posts";
import Comments from "./mainmodules/comments";
import Login from "./mainmodules/login";
import Maincheck from "./mainmodules/maincheck";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Maincheck />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
        <Route path="/comments" element={<Comments />}>
          <Route path=":id" element={<Comments />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
