import React from "react";
import classes from "./BalanceSelect.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

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

const BalanceSelect = (props) => {
  const styles = useStyles();
  return (
    <form className={styles.root} noValidate autoComplete="off">
      <TextField
        id="standard-number"
        label="Balance"
        type="number"
        value={props.balance}
        InputLabelProps={{
          shrink: true,
        }}
        className={styles.balanceInput}
        onChange={props.onBalanceChangeHandler}
        InputProps={{ inputProps: { min: 0, max: 5000 } }}
      />
      {props.error && (
        <div className={`text-danger text-center  mt-2  ${classes.error}`}>
          Insert a number between 0 and 5000
        </div>
      )}
    </form>
  );
};

export default BalanceSelect;
