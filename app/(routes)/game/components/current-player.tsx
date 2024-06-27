"use client";

const CurrentPlayer = ({
  index,
  animation,
}: {
  index: number;
  animation: string;
}) => {
  const players = [
    { id: 1, name: "Player1" },
    { id: 2, name: "Player2" },
    { id: 3, name: "Player3" },
    { id: 4, name: "Player4" },
    { id: 5, name: "Player5" },
    { id: 6, name: "Player6" },
    { id: 7, name: "Player7" },
    { id: 8, name: "Player8" },
    { id: 9, name: "Player9" },
    { id: 10, name: "Player10" },
    { id: 11, name: "Player11" },
    { id: 12, name: "Player12" },
    { id: 13, name: "Player13" },
    { id: 14, name: "Player14" },
    { id: 15, name: "Player15" },
  ];
  const current = players[index % players.length];
  const previous = players[(index - 1 + players.length) % players.length];
  const next = players[(index + 1) % players.length];
  return (
    <div className="flex flex-col items-center">
      <div
        className={`text-slate-400 ${
          animation === "scrollDown" ? "animate-scrollDown" : ""
        }`}
      >
        {next?.name}
      </div>
      <div className={`text-2xl ${animation}`}>{current?.name}</div>
      <div
        className={`text-slate-400 ${
          animation === "scrollUp" ? "animate-scrollUp" : ""
        }`}
      >
        {previous?.name}
      </div>
    </div>
  );
};

export default CurrentPlayer;
