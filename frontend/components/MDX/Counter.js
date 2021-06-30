import React from "react";
import Confetti from "react-confetti";

const { useState } = React;

export function Counter() {
  const [coords, setCoords] = useState(undefined);
  const [pieces, setPieces] = useState(0);
  const [count, setCount] = useState(0);

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="px-5 py-3 rounded-lg transform transition bg-blue-700 hover:bg-blue-400 hover:-translate-y-0.5 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 active:bg-blue-600 uppercase tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base"
      >
        like me
      </button>{" "}
      {count}
      {pieces ? (
        <Confetti
          colors={["#0366d6"]}
          numberOfPieces={pieces}
          confettiSource={coords}
          recycle={false}
          onConfettiComplete={onComplete}
        />
      ) : null}
    </>
  );

  function onClick(ev) {
    setCount(count + 1);
    setPieces(pieces + 24);
    setCoords({ x: ev.pageX, y: ev.pageY });
  }

  function onComplete() {
    setPieces(0);
  }
}
