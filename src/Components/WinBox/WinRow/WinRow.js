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
      className={`d-flex justify-content-center align-items-center  my-1 ps-1 ${
        classes.container
      } ${showBorder ? classes.rainbow : null}`}
    >
      <div
        className={`d-flex justify-content-start align-items-center fw-bold  ${classes.name}`}
      >
        {props.row?.name}
      </div>
      <div
        className={` d-flex justify-content-center align-items-center ${classes.point}`}
      >
        {props.row?.point}
      </div>
    </div>
  );
};

export default WinRow;
