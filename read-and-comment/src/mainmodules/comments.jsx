import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

function Comments() {
  const [comments, setComments] = useState([
    <div key={crypto.randomUUID()} id="nocommentdiv">
      No comments yet
    </div>,
  ]);

  const params = useParams();
  const commenttext = useRef(null);
  useEffect(() => {
    async function getcomments() {
      const user = Cookies.get("username");
      console.log(user);
      const comments = await fetch(
        `http://localhost:3000/comments/${params.id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const commentsobject = await comments.json();
      const commentsjson = commentsobject.comments;

      if (commentsjson.length > 0) {
        const commentsarray = commentsjson.map((item) => {
          let b = null;
          console.log(commentsobject.user);
          async function deletecomment() {
            console.log(item.id);
            await fetch(`http://localhost:3000/comments/${params.id}`, {
              method: "DELETE",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ item: item.id }),
            });
            window.location.reload();
          }
          if (commentsobject.user == item.user) {
            b = (
              <button className="commentdeletebutton" onClick={deletecomment}>
                Delete
              </button>
            );
          }
          const a = (
            <li key={crypto.randomUUID()} className="commentcontainer">
              <div className="comment">{item.comment}</div>
              <div className="user">User: {item.user}</div>
              {b}
            </li>
          );
          return a;
        });

        setComments(commentsarray);
      }
    }
    getcomments();
  }, []);

  async function postcomment() {
    const text = commenttext.current.value;
    await fetch(`http://localhost:3000/comments/${params.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: text,
      }),
    });
    commenttext.current.value = "";
    window.location.reload();
  }

  return (
    <>
      <ul id="comments">{comments}</ul>
      <div id="makecommentcontainer">
        <textarea id="commenttext" ref={commenttext}></textarea>
        <button id="submitcomment" onClick={postcomment}>
          Submit
        </button>
      </div>
    </>
  );
}

export default Comments;
