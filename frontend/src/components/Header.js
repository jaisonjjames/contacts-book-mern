import React from "react";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    fontSize: "1.9rem",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="relative" style={{ marginBottom: "20px" }}>
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          Contact book
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
