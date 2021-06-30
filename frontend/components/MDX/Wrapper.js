import { ScrollytellingLayout } from "../../layouts/ScrollytellingLayout";
import React from "react";
export function Wrapper({ children }) {
  const steps = React.Children.toArray(children);
  const stickers = steps.map((_, stepIndex) => (
    <>
      <span>{stepIndex + 1}</span>
    </>
  ));
  return <ScrollytellingLayout steps={steps} stickers={stickers} />;
}
