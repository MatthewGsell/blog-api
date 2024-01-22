function Login() {
  return (
    <div id="logincontainer">
      <h1>Log in!</h1>
      <form action="http://localhost:3000/login" method="post" id="loginform">
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="password" placeholder="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
