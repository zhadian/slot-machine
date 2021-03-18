import React from "react";
import classes from "./Reels.module.css";
import Reel from "./Reel/Reel";
import background from "../../Assets/slot_machine-100.jpeg";

const Reels = (props) => {
  return (
    <div
      className={`mx-auto  d-flex justify-content-center align-items-center position-relative ${classes.container}`}
    >
      <img alt="background" src={background} />
      {props.totalPoint > 0 ? (
        <div
          className={`fs-1 rounded-circle position-absolute d-flex justify-content-center align-items-center flex-column fw-bold ${classes.circle} ${classes.rainbow}`}
        >
          <p className="fs-5 m-0">Score</p>
          {props.totalPoint}
        </div>
      ) : null}
      <Reel
        status={props.status.status1}
        reels={props.reels.firstReel}
        speed={"0.5s"}
        top={"395px"}
        left={"458px"}
      />
      <Reel
        status={props.status.status2}
        reels={props.reels.secondReel}
        speed={"0.4s"}
        top={"395px"}
        left={"594px"}
      />
      <Reel
        status={props.status.status3}
        reels={props.reels.thirdReel}
        speed={"0.6s"}
        top={"395px"}
        left={"734px"}
      />
    </div>
  );
};

export default Reels;
