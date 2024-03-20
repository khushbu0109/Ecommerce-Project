import React from "react";
export default function StepItem(props) {
  const activeStep = (i) => {
    props.updateStep(i);
  };
  return (
    <>
      <div className={"stepBlock " + (props.selected ? " Selected" : "")}>
        <div
          className={"circleWrapper"}
          onClick={() => {
            activeStep(props.index + 1);
          }}
        >
          <div className="circle">{props.index + 1}</div>
        </div>
      </div>
    </>
  );
}
