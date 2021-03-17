import React from "react";
import classes from "./WinRow.module.css";

const WinRow = (props) => {
  const showBorder = props.winIds?.includes(props.row.id);
  return (
    <div
      style={{
        background: props.background,
        border: showBorder ? "none" : "7px solid #3d4687",
      }}
      className={`${classes.container} ${showBorder ? classes.rainbow : null}`}
    >
      <div className={`${classes.name}`}>{props.row?.name}</div>
      <div className={`${classes.point}`}>{props.row?.point}</div>
    </div>
  );
};

export default WinRow;
