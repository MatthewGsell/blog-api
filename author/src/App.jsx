import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./mainmodules/signup";
import Login from "./mainmodules/login";
import Maincheck from "./mainmodules/maincheck";
import CreatePost from "./mainmodules/createpost";

function App() {
  /*
        <Route path="/publishedposts" element={<PublishedPosts />}></Route>
        <Route path="/drafts" element={<Drafts />}></Route> */

  return (
    <>
      <Routes>
        <Route path="/" element={<Maincheck />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/createpost" element={<CreatePost />}></Route>
      </Routes>
    </>
  );
}

export default App;
