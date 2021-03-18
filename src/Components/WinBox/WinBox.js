import React from "react";
import WinRow from "./WinRow/WinRow";
import classes from "./WinBox.module.css";

const WinBox = (props) => {
  const rows = props.winComb?.map((row) => {
    return <WinRow key={row.id} winIds={props.winIds} row={row} />;
  });
  return (
    <div className={`position-absolute ${classes.winContainer}`}>
      {rows}
      <WinRow
        row={{ name: "Total Points", point: props.totalPoint }}
        background="#23c7c7"
      />
    </div>
  );
};

export default WinBox;
