import React, { useState } from "react";
import "./App.css";
import Reels from "./Components/Reels/Reels";
import { Button, TextField } from "@material-ui/core";
import bar from "./Assets/BAR.png";
import threeBar from "./Assets/3xBAR.png";
import twoBar from "./Assets/2xBAR.png";
import seven from "./Assets/7.png";
import cherry from "./Assets/Cherry.png";
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

function App() {
  const [reels, setReels] = useState({});
  const [buttonStatus, setButtonStatus] = useState("START");
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(false);
  const [status1, setStatus1] = useState("start");
  const [status2, setStatus2] = useState("start");
  const [status3, setStatus3] = useState("start");

  const classes = useStyles();
  const winningComb = [
    { name: "3 CHERRY symbols on top line", point: 2000 },
    { name: "3 CHERRY symbols on center line", point: 1000 },
    { name: "3 CHERRY symbols on bottom line", point: 4000 },
    { name: "3 7 symbols on any line", point: 2000 },
    { name: "Any combination of CHERRY and 7 on any line", point: 75 },
    { name: "3 3xBAR symbols on any line", point: 50 },
    { name: "3 2xBAR symbols on any line", point: 20 },
    { name: "3 BAR symbols on any line", point: 10 },
    { name: "Combination of any BAR symbols on any line", point: 5 },
  ];
  const data = [
    {
      name: "3bar-bar",
      urls: {
        top: threeBar,
        bottom: bar,
      },
    },
    {
      name: "bar-2bar",
      urls: {
        top: bar,
        bottom: twoBar,
      },
    },
    {
      name: "2bar-7",
      urls: {
        top: twoBar,
        bottom: seven,
      },
    },
    {
      name: "7-cherry",
      urls: {
        top: seven,
        bottom: cherry,
      },
    },
    {
      name: "cherry-3bar",
      urls: {
        top: cherry,
        bottom: threeBar,
      },
    },
    {
      name: "3bar",
      urls: {
        top: cherry,
        center: threeBar,
        bottom: bar,
      },
    },
    {
      name: "bar",
      urls: {
        top: threeBar,
        center: bar,
        bottom: twoBar,
      },
    },
    {
      name: "2bar",
      urls: {
        top: bar,
        center: twoBar,
        bottom: seven,
      },
    },
    {
      name: "7",
      urls: {
        top: twoBar,
        center: seven,
        bottom: cherry,
      },
    },
    {
      name: "cherry",
      urls: {
        top: seven,
        center: cherry,
        bottom: threeBar,
      },
    },
  ];

  const onPressClickHandler = () => {
    const reels = {
      firstReel: data[Math.floor(Math.random() * data.length)],
      secondReel: data[Math.floor(Math.random() * data.length)],
      thirdReel: data[Math.floor(Math.random() * data.length)],
    };
    if (buttonStatus === "START" && balance > 0) {
      setBalance(balance - 1);
      setButtonStatus("Wait...");
      setStatus1("rolling");
      setStatus2("rolling");
      setStatus3("rolling");
      setReels(reels);
      setTimeout(() => {
        setStatus1("end");
      }, [2000]);
      setTimeout(() => {
        setStatus2("end");
      }, [2500]);
      setTimeout(() => {
        setStatus3("end");
        setButtonStatus("REFRESH");
      }, [3000]);
    } else if (buttonStatus === "REFRESH") {
      setButtonStatus("START");
      setStatus1("start");
      setStatus2("start");
      setStatus3("start");
    }
  };
  const onBalanceChangeHandler = (e) => {
    if (e.target.value <= 5000) {
      setError(false);
      setBalance(+e.target.value);
    } else {
      setError(true);
    }
  };

  return (
    <div className="vh-100 h-100 overflow-hidden">
      <div className="position-relative fixContainer mx-auto">
        <Reels
          status={{ status1: status1, status2: status2, status3: status3 }}
          reels={reels}
        />
        <div className={`position-absolute app`}>
          <ThemeProvider theme={theme}>
            <Button
              disabled={balance === 0}
              onClick={onPressClickHandler}
              variant="contained"
              color="primary"
              className={classes.but}
            >
              {buttonStatus}
            </Button>
          </ThemeProvider>
          {balance === 0 && (
            <div className="text-danger outBalance">You are out of balance</div>
          )}
        </div>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-number"
            label="Balance"
            type="number"
            value={balance}
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.balanceInput}
            onChange={onBalanceChangeHandler}
            InputProps={{ inputProps: { min: 0, max: 5000 } }}
          />
          {error && (
            <div className="text-danger error">
              Insert a number between 0 and 5000
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
