import React, { useState } from "react";

const Login = () => {
  const [test, setTest] = useState("test");

  console.log(test);
  return (
    <div>
      <p>Login works!</p>
    </div>
  );
};

export default Login;
