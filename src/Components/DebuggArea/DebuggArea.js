import React from "react";
import classes from "./DebuggArea.module.css";
import { FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import ReelOption from "./ReelOption/ReelOption";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#23c7c7",
    },
  },
});

const DebuggArea = (props) => {
  return (
    <div className={`position-absolute ${classes.container}`}>
      <div className="position-relative">
        <div
          style={{ top: props.debugMode ? "36px" : "-200px" }}
          className={`position-absolute w-100  d-flex justify-content-center align-items-end ${classes.accordion}`}
        >
          <ReelOption
            lineName={"leftLine"}
            lineValue={props.reel.leftLine}
            symbolName={"leftSymbol"}
            symboleValue={props.reel.leftSymbol}
            handleChange={props.handleChange}
            title={"Left Reel"}
          />
          <ReelOption
            lineName={"centerLine"}
            lineValue={props.reel.centerLine}
            symbolName={"centerSymbol"}
            symboleValue={props.reel.centerSymbol}
            handleChange={props.handleChange}
            title={"Center Reel"}
          />
          <ReelOption
            lineName={"rightLine"}
            lineValue={props.reel.rightLine}
            symbolName={"rightSymbol"}
            symboleValue={props.reel.rightSymbol}
            handleChange={props.handleChange}
            title={"Right Reel"}
          />
        </div>
        <div
          className={`w-100 d-flex justify-content-center align-items-center position-relative ${classes.header}`}
        >
          <ThemeProvider theme={theme}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={props.debugMode}
                    onChange={props.handleDebugModeChange}
                    name="debugMode"
                    color="primary"
                  />
                }
                label="Debug Mode"
              />
            </FormGroup>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default DebuggArea;
