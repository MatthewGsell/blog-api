import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [postArray, setPostArray] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getposts() {
      const posts = await fetch("http://localhost:3000/authorsposts", {
        method: "GET",
        credentials: "include",
      });

      const postsjson = await posts.json();
      console.log(postsjson);
      const newpostarray = postsjson.map((item) => {
        return (
          <li key={item._id} id={item._id}>
            <div>{item.message}</div>
            <button onClick={deletepost}>Delete Post</button>
          </li>
        );
      });
      setPostArray(newpostarray);
    }
    getposts();
  }, []);

  async function deletepost(event) {
    const id = event.target.parentElement.id;
    await fetch("http://localhost:3000/authorsposts", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });
    window.location.reload();
  }
  function back() {
    navigate("/createpost");
  }

  return (
    <div id="mypostscontainer">
      <h1>My Posts</h1>
      <ul id="posts">{postArray}</ul>
      <button onClick={back}>Back</button>
    </div>
  );
}

export default Posts;
