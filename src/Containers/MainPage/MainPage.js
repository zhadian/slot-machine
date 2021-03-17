import React, { useState, useReducer } from "react";
import classes from "./MainPage.module.css";
import Reels from "../../Components/Reels/Reels";
import { Button, TextField } from "@material-ui/core";
import bar from "../../Assets/BAR.png";
import threeBar from "../../Assets/3xBAR.png";
import twoBar from "../../Assets/2xBAR.png";
import seven from "../../Assets/7.png";
import cherry from "../../Assets/Cherry.png";
import WinBox from "../../Components/WinBox/WinBox";
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

const MainPage = () => {
  const initialState = {
    balance: 10,
    totalPoint: 0,
    status1: "start",
    status2: "start",
    status3: "start",
    winIds: [],
    buttonStatus: "START",
    error: false,
  };
  const statusReducer = (state, action) => {
    switch (action.type) {
      case "START":
        return {
          ...state,
          balance: state.balance - 1,
          status1: "rolling",
          status2: "rolling",
          status3: "rolling",
          buttonStatus: "Waiting...",
        };
      case "END1":
        return {
          ...state,
          status1: "end",
        };
      case "END2":
        return {
          ...state,
          status2: "end",
        };
      case "END3":
        return {
          ...state,
          status3: "end",
          balance: state.balance - 1 + action.point,
          totalPoint: action.point,
          winIds: action.winIds,
          buttonStatus: "REFRESH",
        };
      case "REFRESH":
        return {
          ...state,
          buttonStatus: "START",
          winIds: [],
          totalPoint: 0,
          status1: "start",
          status2: "start",
          status3: "start",
        };
      case "INPUTBALANCE":
        return {
          ...state,
          balance: action.value,
          error: false,
        };
      case "ERROR":
        return {
          ...state,
          error: true,
        };
      default:
        throw new Error("Should not be reached");
    }
  };
  const [state, dispatch] = useReducer(statusReducer, initialState);
  const [reels, setReels] = useState({});

  const styles = useStyles();
  const winningComb = [
    {
      id: 1,
      type: "triple",
      line: ["top"],
      value: ["cherry", "cherry", "cherry"],
      name: "3 CHERRY symbols on top line",
      point: 2000,
    },
    {
      id: 2,
      type: "triple",
      line: ["center"],
      value: ["cherry", "cherry", "cherry"],
      name: "3 CHERRY symbols on center line",
      point: 1000,
    },
    {
      id: 3,
      type: "triple",
      line: ["bottom"],
      value: ["cherry", "cherry", "cherry"],
      name: "3 CHERRY symbols on bottom line",
      point: 4000,
    },
    {
      id: 4,
      type: "triple",
      line: ["top", "center", "bottom"],
      value: ["7", "7", "7"],
      name: "3 7 symbols on any line",
      point: 2000,
    },
    {
      id: 5,
      type: "any",
      line: ["top", "center", "bottom"],
      value: ["cherry", "7"],
      name: "Any combination of CHERRY and 7 on any line",
      point: 75,
    },
    {
      id: 6,
      type: "triple",
      line: ["top", "center", "bottom"],
      value: ["3bar", "3bar", "3bar"],
      name: "3 3xBAR symbols on any line",
      point: 50,
    },
    {
      id: 7,
      type: "triple",
      line: ["top", "center", "bottom"],
      value: ["2bar", "2bar", "2bar"],
      name: "3 2xBAR symbols on any line",
      point: 20,
    },
    {
      id: 8,
      type: "triple",
      line: ["top", "center", "bottom"],
      value: ["bar", "bar", "bar"],
      name: "3 BAR symbols on any line",
      point: 10,
    },
    {
      id: 9,
      type: "any",
      line: ["top", "center", "bottom"],
      value: ["bar"],
      name: "Combination of any BAR symbols on any line",
      point: 5,
    },
  ];

  const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  const findIn = (array, params) => {
    let result = true;
    for (let i in params) {
      result = result && array.includes(params[i]);
    }
    return result;
  };

  function CalculatePoints(top, center, bottom) {
    let data = { point: 0, winIds: [] };

    for (let i in winningComb) {
      const lines = winningComb[i]["line"];
      const values = winningComb[i]["value"];
      const points = winningComb[i]["point"];
      const types = winningComb[i]["type"];
      const Ids = winningComb[i]["id"];
      const params = { top: top, center: center, bottom: bottom };

      for (let line in lines) {
        if (types === "any") {
          if (findIn(params[lines[line]], values)) {
            data.point += points;
            data.winIds.push(Ids);
          }
        } else {
          if (equals(values, params[lines[line]])) {
            data.point += points;
            data.winIds.push(Ids);
          }
        }
      }
    }
    return data;
  }

  const data = [
    {
      value: ["3bar", null, "bar"],
      urls: {
        top: threeBar,
        bottom: bar,
      },
    },
    {
      value: ["bar", null, "2bar"],
      urls: {
        top: bar,
        bottom: twoBar,
      },
    },
    {
      value: ["2bar", null, "7"],
      urls: {
        top: twoBar,
        bottom: seven,
      },
    },
    {
      value: ["7", null, "cherry"],
      urls: {
        top: seven,
        bottom: cherry,
      },
    },
    {
      value: ["cherry", null, "3bar"],
      urls: {
        top: cherry,
        bottom: threeBar,
      },
    },
    {
      value: [null, "3bar", null],
      urls: {
        top: cherry,
        center: threeBar,
        bottom: bar,
      },
    },
    {
      value: [null, "bar", null],
      urls: {
        top: threeBar,
        center: bar,
        bottom: twoBar,
      },
    },
    {
      value: [null, "2bar", null],
      urls: {
        top: bar,
        center: twoBar,
        bottom: seven,
      },
    },
    {
      value: [null, "7", null],
      urls: {
        top: twoBar,
        center: seven,
        bottom: cherry,
      },
    },
    {
      value: [null, "cherry", null],
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
    setReels(reels);
    const top = [
      reels.firstReel.value[0],
      reels.secondReel.value[0],
      reels.thirdReel.value[0],
    ];
    const center = [
      reels.firstReel.value[1],
      reels.secondReel.value[1],
      reels.thirdReel.value[1],
    ];
    const bottom = [
      reels.firstReel.value[2],
      reels.secondReel.value[2],
      reels.thirdReel.value[2],
    ];

    if (state.buttonStatus === "START" && state.balance > 0) {
      dispatch({ type: "START" });
      setTimeout(() => {
        dispatch({ type: "END1" });
      }, [2000]);
      setTimeout(() => {
        dispatch({ type: "END2" });
      }, [2500]);
      setTimeout(() => {
        dispatch({
          type: "END3",
          point: CalculatePoints(top, center, bottom).point,
          winIds: CalculatePoints(top, center, bottom).winIds,
        });
      }, [3000]);
    } else if (state.buttonStatus === "REFRESH") {
      dispatch({ type: "REFRESH" });
    }
  };
  const onBalanceChangeHandler = (e) => {
    if (e.target.value <= 5000) {
      dispatch({ type: "INPUTBALANCE", value: +e.target.value });
    } else {
      dispatch({ type: "ERROR" });
    }
  };
  return (
    <div className={`position-relative ${classes.fixContainer} mx-auto`}>
      <Reels
        status={{
          status1: state.status1,
          status2: state.status2,
          status3: state.status3,
        }}
        reels={reels}
        totalPoint={state.totalPoint}
      />
      <div className={`position-absolute ${classes.app}`}>
        <ThemeProvider theme={theme}>
          <Button
            disabled={state.balance === 0}
            onClick={onPressClickHandler}
            variant="contained"
            color="primary"
            className={styles.but}
          >
            {state.buttonStatus}
          </Button>
        </ThemeProvider>
        {state.balance === 0 && (
          <div className={`text-danger ${classes.outBalance}`}>
            You are out of balance
          </div>
        )}
      </div>
      <form className={styles.root} noValidate autoComplete="off">
        <TextField
          id="standard-number"
          label="Balance"
          type="number"
          value={state.balance}
          InputLabelProps={{
            shrink: true,
          }}
          className={styles.balanceInput}
          onChange={onBalanceChangeHandler}
          InputProps={{ inputProps: { min: 0, max: 5000 } }}
        />
        {state.error && (
          <div className={`text-danger ${classes.error}`}>
            Insert a number between 0 and 5000
          </div>
        )}
      </form>
      <div className={`${classes.winContainer}`}>
        <WinBox
          winIds={state.winIds}
          totalPoint={state.totalPoint}
          winComb={winningComb}
        />
      </div>
    </div>
  );
};

export default MainPage;
