function Signup() {
  return (
    <div id="signupcontainer">
      <h1>Sign Up!</h1>
      <form action="http://localhost:3000/signup" method="post" id="signupform">
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="password" placeholder="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
