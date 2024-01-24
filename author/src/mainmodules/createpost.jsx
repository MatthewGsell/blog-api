import { useRef } from "react";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const post = useRef();
  const navigate = useNavigate();
  async function publishpost() {
    await fetch("http://localhost:3000/createpost", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post: post.current.value }),
    });
    window.location.reload();
  }
  async function createdraft() {
    await fetch("http://localhost:3000/createdraft", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post: post.current.value }),
    });
    window.location.reload();
  }

  function gotoposts() {
    navigate("/posts");
  }
  function gotodrafts() {
    navigate("/drafts");
  }

  return (
    <div id="createpostcontainer">
      <h1>Create Post</h1>
      <textarea ref={post}></textarea>
      <button onClick={publishpost}>Publish Post</button>
      <button onClick={createdraft}>Save Draft</button>
      <button onClick={gotoposts}>Posts</button>
      <button onClick={gotodrafts}>Drafts</button>
    </div>
  );
}

export default CreatePost;
