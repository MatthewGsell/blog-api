import { useRef } from "react";

function CreatePost() {
  const post = useRef();
  async function publishpost() {
    await fetch("http://localhost:3000/createpost", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post: post.current.value }),
    });
  }

  return (
    <div id="createpostcontainer">
      <h1>Create Post</h1>
      <textarea ref={post}></textarea>
      <button onClick={publishpost}>Publish Post</button>
      <button>Save Draft</button>
    </div>
  );
}

export default CreatePost;
