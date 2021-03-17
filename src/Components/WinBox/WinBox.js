import React from "react";
import WinRow from "./WinRow/WinRow";

const WinBox = (props) => {
  const rows = props.winComb?.map((row) => {
    return <WinRow winIds={props.winIds} row={row} />;
  });
  return (
    <div>
      {rows}
      <WinRow
        row={{ name: "Total Points", point: props.totalPoint }}
        background="#23c7c7"
      />
    </div>
  );
};

export default WinBox;
