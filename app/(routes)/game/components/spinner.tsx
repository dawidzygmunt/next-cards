"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Wheel } from "react-custom-roulette";

export const SpinnerMine = () => {
  const data = [{ option: "0" }, { option: "1" }, { option: "2" }];
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };
  return (
    <div>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
        spinDuration={0.2}
      />
      <Button onClick={handleSpinClick}>SPIN</Button>
    </div>
  );
};
