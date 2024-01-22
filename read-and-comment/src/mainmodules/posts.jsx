import { useState, useEffect } from "react"
import { Link } from "react-router-dom"



function Posts() {
  const [postArray, setPostArray] = useState([])
  useEffect(() => {
    async function getposts() {
      const posts = await fetch('http://localhost:3000/posts', {
        method: 'GET',
        credentials: 'include'
      })
      
      const postsjson = await posts.json()
      console.log(postsjson)
      const newpostarray = postsjson.map((item) => {
        
        return <li key={crypto.randomUUID()}>{item.message}<div>{item.author}{<Link to={{pathname: `/comments/${item._id}`}}>Comments</Link>}</div></li>
      })
      setPostArray(newpostarray)
  
    }
    getposts()
  }, [])
  

  return <ul id="posts">{postArray}</ul>;
}

export default Posts;
