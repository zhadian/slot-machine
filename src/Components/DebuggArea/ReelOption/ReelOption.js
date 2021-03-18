import React from "react";
import classes from "./ReelOption.module.css";
import { InputLabel, FormControl, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: " 100%",
    fontSize: "10px",
    margin: "5px 0",
  },
}));

const ReelOption = (props) => {
  const styles = useStyles();
  return (
    <div className={`m-1 ${classes.container}`}>
      <div
        className={`fw-bolder fs-6 d-flex flex-column justify-content-center align-items-center`}
      >
        {props.title}
      </div>

      <FormControl className={styles.formControl}>
        <InputLabel htmlFor="reel-symbol">Symbol</InputLabel>
        <Select
          native
          value={props.symbolValue}
          onChange={props.handleChange}
          inputProps={{
            name: props.symbolName,
            id: "reel-symbol",
          }}
        >
          <option value={"bar"}>BAR</option>
          <option value={"2bar"}>2xBAR</option>
          <option value={"3bar"}>3xBAR</option>
          <option value={"7"}>7</option>
          <option value={"cherry"}>Cherry</option>
        </Select>
      </FormControl>
      <FormControl className={styles.formControl}>
        <InputLabel htmlFor="reel-line">Line</InputLabel>
        <Select
          native
          value={props.lineValue}
          onChange={props.handleChange}
          inputProps={{
            name: props.lineName,
            id: "reel-line",
          }}
        >
          <option value={0}>TOP</option>
          <option value={1}>CENTER</option>
          <option value={2}>BOTTOM</option>
        </Select>
      </FormControl>
    </div>
  );
};

export default ReelOption;
