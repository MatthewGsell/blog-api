import { Link } from "react-router-dom";

function Login() {
  return (
    <div id="logincontainer">
      <h1>Author Log in!</h1>
      <form
        action="http://localhost:3000/loginauthor"
        method="post"
        id="loginform"
      >
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="password" placeholder="password" />
        <button type="submit">Submit</button>
      </form>
      <p>Not a member? {<Link to="/signup">Sign up</Link>} </p>
    </div>
  );
}

export default Login;
