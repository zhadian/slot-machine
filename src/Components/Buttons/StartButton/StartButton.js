import React from "react";
import classes from "./StartButton.module.css";
import { Button } from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#23c7c7",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  but: {
    color: "#d8f3fe",
    width: "150px",
    fontWeight: "bold",
    fontSize: "20px",
    border: "5px solid #434487",
    borderRadius: "10px",
  },
  root: {
    position: "absolute",
    top: "40%",
    right: "0",
    width: "150px",
  },
  balanceInput: {
    width: "100%",
  },
}));

const StartButton = (props) => {
  const styles = useStyles();
  return (
    <div className={`position-absolute ${classes.app}`}>
      <ThemeProvider theme={theme}>
        <Button
          disabled={props.balance === 0}
          onClick={props.onPressClickHandler}
          variant="contained"
          color="primary"
          className={styles.but}
        >
          {props.buttonStatus}
        </Button>
      </ThemeProvider>
      {props.balance === 0 && (
        <div
          className={`text-danger text-center mt-2 fs- ${classes.outBalance}`}
        >
          You are out of balance
        </div>
      )}
    </div>
  );
};

export default StartButton;
