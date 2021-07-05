import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Grid,
  Button,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockOutlineIcon from "@material-ui/icons/LockOutlined";
import * as actions from "../../actionTypes/actionTypes";
import { signIn, signUp } from "../../actions/auth";
function Auth() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handlePasswordChange() {
    setShowPassword(!showPassword);
  }
  function handleChange(event) {
    const { name, value } = event.target;

    setState((preval) => ({ ...preval, [name]: value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (isSignUp) {
      dispatch(signUp(state, history));
    } else {
      dispatch(signIn(state, history));
    }
  }

  async function googleSuccess(response) {
    const result = response?.profileObj;
    const token = response?.tokenId;

    try {
      dispatch({ type: actions.AUTH, data: { result, token } });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  function googleFailure() {
    console.log("Google Sign In was unsuccessful");
  }
  function switchMode() {
    setShowPassword(false);
    setIsSignUp(!isSignUp);
  }
  return (
    <div className="parent">
      <form className="auth_form" onSubmit={handleSubmit}>
        <Avatar className="auth_form_avatar">
          <LockOutlineIcon />
        </Avatar>
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <Grid container spacing={2}>
          {isSignUp ? (
            <>
              <div className="input_flex">
                <input
                  className="input-grid"
                  autoFocus
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                />

                <input
                  className="input-grid2"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
              />
              <div className="password_field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <InputAdornment className="pass_visibilty">
                  <IconButton onClick={handlePasswordChange}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              </div>

              <input
                type="password"
                name="password2"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
              <Button type="submit" variant="contained" className="btn">
                {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
              <GoogleLogin
                clientId="863603533939-joibgtapjt59bov5t149qf3ct8bk66sd.apps.googleusercontent.com"
                className="google_btn"
                buttonText="Sign up with Google"
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />
              <p onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </p>
            </>
          ) : (
            <>
              <input
                autoFocus
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
              />
              <div className="password_field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <InputAdornment className="pass_visibilty">
                  <IconButton onClick={handlePasswordChange}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              </div>
              <Button type="submit" variant="contained" className="btn">
                {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
              <GoogleLogin
                clientId="863603533939-joibgtapjt59bov5t149qf3ct8bk66sd.apps.googleusercontent.com"
                className="google_btn"
                buttonText="Login up with Google"
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />

              <p onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </p>
            </>
          )}
        </Grid>
      </form>
    </div>
  );
}

export default Auth;
