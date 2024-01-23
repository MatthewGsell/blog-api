import { Link } from "react-router-dom";

function Signup() {
  return (
    <div id="signupcontainer">
      <h1>Author Sign Up!</h1>
      <form
        action="http://localhost:3000/signupauthor"
        method="post"
        id="signupform"
      >
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="password" placeholder="password" />
        <button type="submit">Submit</button>
      </form>
      <p>already a member? {<Link to="/login">Log in</Link>} </p>
    </div>
  );
}

export default Signup;
