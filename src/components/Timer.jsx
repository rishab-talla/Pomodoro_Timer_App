export default function Timer({ timeLeft, mode }) {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const modeColors = {
    work: "bg-red-500",
    shortBreak: "bg-green-500",
    longBreak: "bg-blue-500",
  };

  return (
    <div
      className={`p-10 rounded-2xl text-center ${modeColors[mode]} shadow-xl`}
    >
      <h2 className="text-2xl font-bold mb-2">
        {mode === "work"
          ? "Work Session"
          : mode === "shortBreak"
          ? "Short Break"
          : "Long Break"}
      </h2>
      <h1 className="text-6xl font-mono">
        {minutes}:{seconds}
      </h1>
    </div>
  );
}
