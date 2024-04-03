import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const history = useHistory();

  return (
    <>
      {/* <div className='bowserLogo'></div> */}
      <div>
        <div className="bowsermonMainHeader">
          <img src="images/bowserLogo2.png" height="150px" width="150px" />

          <h1>Bowsermon</h1>
        </div>

        <LoginForm />

        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push("/registration");
            }}
          >
            Register
          </button>
        </center>
      </div>
    </>
  );
}

export default LoginPage;
