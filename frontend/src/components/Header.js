import React from "react";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Box, Container, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    fontSize: "1.9rem",
  },
  logo: {
    flex: "1",
  },
}));

const Header = (userInfo) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userInfo: user } = userInfo;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <AppBar position="relative" style={{ marginBottom: "20px" }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              flex: 1,
              display: { xs: "none", md: "flex" },
            }}
            className={classes.logo}
          >
            CONTACT BOOK
          </Typography>
          {user ? (
            <Typography variant="h6" className={classes.name}>
              {`Hello ${user.firstName} ${user.lastName}`}
            </Typography>
          ) : null}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {user ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : null}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
