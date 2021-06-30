import { Scroller, Step as ScrollerStep } from "@code-hike/scroller";

import React from "react";
export { ScrollytellingLayout };

function ScrollytellingLayout({ steps, stickers }) {
  const [stepIndex, setIndex] = React.useState(0);
  return (
    <div className="main">
      <div className="content">
        <Scroller onStepChange={setIndex}>
          {steps.map((c, i) => (
            <ScrollerStep
              key={i}
              id={`step-${i}`}
              index={i}
              className="step"
              style={{
                opacity: stepIndex === i ? 0.99 : 0.4,
              }}
            >
              {c}
            </ScrollerStep>
          ))}
        </Scroller>
      </div>
      <div className="sticker">
        <div>{stickers[stepIndex]}</div>
      </div>
    </div>
  );
}
