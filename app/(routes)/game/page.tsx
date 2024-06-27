"use client";
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { SpinnerMine } from "./components/spinner";
import { Button } from "@/components/ui/button";
import CardBasic from "@/components/card-basic";
import { title } from "process";
import CurrentPlayer from "./components/current-player";

const data = { typ: "0", wersja: "1", ilosc: 2, tresc: "asd", kara: "3" };
const Game = () => {
  const [playerIndex, setPlayerIndex] = useState(0);

  const [animation, setAnimation] = useState("");

  const handleNext = () => {
    setAnimation("animate-scrollUp");
    setTimeout(() => {
      setPlayerIndex((prevIndex) => (prevIndex + 1) % 15);
      setAnimation("");
    }, 200);
  };

  const handlePrev = () => {
    setAnimation("animate-scrollDown");
    setTimeout(() => {
      setPlayerIndex((prevIndex) => (prevIndex - 1 + 15) % 15);
      setAnimation("");
    }, 200);
  };

  return (
    <div className="flex flex-col w-full min-h-screen m-5 items-center">
      <CurrentPlayer index={playerIndex} animation={animation} />
      <CardBasic data={data} />
      <div className="flex gap-3 m-2">
        <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default Game;
