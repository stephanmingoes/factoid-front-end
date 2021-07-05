import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../actionTypes/actionTypes";
import {} from "react-router-dom";
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  Grid,
} from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import image from "../images/lightbulb.png";
import decode from "jwt-decode";

export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  function logout() {
    dispatch({ type: actions.LOGOUT });

    history.push("/");
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 100 > new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className="header">
      <Grid container justify="space-between" alignItems="stretch">
        <Grid xs={12} sm={8}>
          <div className="header_logo">
            <img className="header_logo_img" src={image} alt="Factoid Logo" />

            <Typography component={Link} to="/" variant="h2">
              FACTOID
            </Typography>
          </div>
        </Grid>
        <Grid xs={12} sm={4}>
          <Toolbar className="toolbar">
            {user ? (
              <div className="profile">
                <Avatar
                  className="profile_avatar"
                  alt={user.result.name}
                  src={user.result.imageUrl}
                >
                  {user.result.name.charAt(0)}
                </Avatar>
                <Typography className="profile_name" variant="h6">
                  {user.result.name}
                </Typography>
                <Button
                  variant="contained"
                  className="profile_logout_btn"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                component={Link}
                to="/auth"
                variant="contained"
                className="profile_signin_btn"
              >
                Sign In
              </Button>
            )}
          </Toolbar>
        </Grid>
      </Grid>
    </AppBar>
  );
}
