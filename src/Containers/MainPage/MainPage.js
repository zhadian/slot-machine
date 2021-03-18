import React, { useState, useReducer, useCallback } from "react";
import classes from "./MainPage.module.css";
import { data, winningComb } from "../../data/data";
import Reels from "../../Components/Reels/Reels";
import Button from "../../Components/Buttons/StartButton/StartButton";
import WinBox from "../../Components/WinBox/WinBox";
import DebuggArea from "../../Components/DebuggArea/DebuggArea";
import BalanceSelect from "../../Components/Buttons/BalanceSelect/BalanceSelect";

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
  const [debugMode, setDebugMode] = useState(false);
  const [debugState, setDebugState] = useState({
    leftSymbol: "bar",
    leftLine: 0,
    centerSymbol: "bar",
    centerLine: 0,
    rightSymbol: "bar",
    rightLine: 0,
  });

  const equals = useCallback((a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  }, []);

  const findIn = useCallback((array, params) => {
    let result = true;
    for (let i in params) {
      result = result && array.includes(params[i]);
    }
    return result;
  }, []);

  const CalculatePoints = useCallback(
    (top, center, bottom) => {
      let data = { point: 0, winIds: [] };

      for (let i in winningComb) {
        const { line, value, point, type, id } = winningComb[i];
        const params = { top: top, center: center, bottom: bottom };

        for (let j in line) {
          if (type === "any") {
            if (findIn(params[line[j]], value)) {
              data.point += point;
              data.winIds.push(id);
            }
          } else {
            if (equals(value, params[line[j]])) {
              data.point += point;
              data.winIds.push(id);
            }
          }
        }
      }
      return data;
    },
    [findIn, equals]
  );

  const onPressClickHandler = () => {
    let reels = {};
    if (debugMode) {
      reels = {
        firstReel: data.find(
          (item) => item.value[debugState.leftLine] === debugState.leftSymbol
        ),
        secondReel: data.find(
          (item) =>
            item.value[debugState.centerLine] === debugState.centerSymbol
        ),
        thirdReel: data.find(
          (item) => item.value[debugState.rightLine] === debugState.rightSymbol
        ),
      };
    } else {
      reels = {
        firstReel: data[Math.floor(Math.random() * data.length)],
        secondReel: data[Math.floor(Math.random() * data.length)],
        thirdReel: data[Math.floor(Math.random() * data.length)],
      };
    }
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

  const onBalanceChangeHandler = (event) => {
    if (event.target.value <= 5000) {
      dispatch({ type: "INPUTBALANCE", value: +event.target.value });
    } else {
      dispatch({ type: "ERROR" });
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    setDebugState({
      ...debugState,
      [name]: event.target.value,
    });
  };

  const handleDebugModeChange = () => {
    setDebugMode(!debugMode);
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
      <Button
        balance={state.balance}
        onPressClickHandler={onPressClickHandler}
        buttonStatus={state.buttonStatus}
      />
      <BalanceSelect
        balance={state.balance}
        error={state.error}
        onBalanceChangeHandler={onBalanceChangeHandler}
      />
      <WinBox
        winIds={state.winIds}
        totalPoint={state.totalPoint}
        winComb={winningComb}
      />
      <DebuggArea
        debugMode={debugMode}
        handleDebugModeChange={handleDebugModeChange}
        handleChange={handleChange}
        reel={debugState}
      />
    </div>
  );
};

export default MainPage;
