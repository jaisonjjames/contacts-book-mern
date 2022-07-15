import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Link,
} from "@material-ui/core";
import { signIn, signUp } from "../actions/auth";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
    backgroundColor: "blue",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#3f51b5",
    },
  },
}));

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = (history) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isSignup, setIsSignup] = useState(false);
  const [authForm, setAuthForm] = useState(initialState);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/contact");
    }
  }, [navigate, userInfo]);

  const googleSuccess = async (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential);
    try {
      const form = {
        firstName: decoded.given_name,
        lastName: decoded.family_name,
        email: decoded.email,
        password: decoded.jti,
      };
      dispatch(signUp(form));
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (err) => {
    console.log("Google login failed, please try again later");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = authForm;

    if (isSignup) {
      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        password !== confirmPassword
      ) {
        alert("Some field is missing or password mismatch!");
      } else {
        e.currentTarget.textContent = "Signing up...";
        dispatch(signUp(authForm));
      }
    } else {
      if (!email || !password) {
        alert("Please fill all fields!");
      } else {
        e.currentTarget.textContent = "Signing in...";
        dispatch(signIn(authForm));
      }
    }
  };

  return (
    <>
      <Header />
      <Link href="/contact">Go to contact</Link>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            {`${isSignup ? "Sign up" : "Sign In"}`}
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fName"
                      name="firstName"
                      variant="outlined"
                      id="firstName"
                      label="First Name"
                      required
                      fullWidth
                      autoFocus
                      onChange={(e) =>
                        setAuthForm({
                          ...authForm,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="lName"
                      name="lastName"
                      variant="outlined"
                      id="lastName"
                      label="Last Name"
                      required
                      fullWidth
                      onChange={(e) =>
                        setAuthForm({
                          ...authForm,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  id="email"
                  label="Email"
                  required
                  fullWidth
                  onChange={(e) =>
                    setAuthForm({
                      ...authForm,
                      email: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="cur-password"
                  name="password"
                  variant="outlined"
                  id="password"
                  label="Password"
                  type="password"
                  required
                  fullWidth
                  onChange={(e) =>
                    setAuthForm({
                      ...authForm,
                      password: e.target.value,
                    })
                  }
                />
              </Grid>
              {isSignup && (
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="conf-password"
                    name="password"
                    variant="outlined"
                    id="conf_password"
                    label="Confirm Password"
                    type="password"
                    required
                    fullWidth
                    onChange={(e) =>
                      setAuthForm({
                        ...authForm,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmit}
                >
                  {isSignup ? "Sign Up" : "Sign In"}
                </Button>
                <GoogleLogin
                  onSuccess={googleSuccess}
                  onError={googleFailure}
                  useOneTap
                  width="396"
                ></GoogleLogin>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                {isSignup ? (
                  <span>
                    Already have an account?{" "}
                    <Link
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsSignup(false)}
                    >
                      Sign In
                    </Link>
                  </span>
                ) : (
                  <span>
                    Don't have an account?{" "}
                    <Link
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsSignup(true)}
                    >
                      Sign Up
                    </Link>
                  </span>
                )}
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Auth;
