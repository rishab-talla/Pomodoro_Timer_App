function ModeSwitcher({ currentMode, setMode }) {
  const buttonClasses = (modeName) =>
    `px-4 py-2 rounded-lg focus:outline-none ${
      currentMode === modeName
        ? "bg-blue-600 text-white"
        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    }`;

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setMode("work")}
        className={buttonClasses("work")}
        aria-label="Switch to work (Pomodoro) mode"
      >
        Pomodoro
      </button>
      <button
        onClick={() => setMode("shortBreak")}
        className={buttonClasses("shortBreak")}
        aria-label="Switch to short break"
      >
        Short Break
      </button>
      <button
        onClick={() => setMode("longBreak")}
        className={buttonClasses("longBreak")}
        aria-label="Switch to long break"
      >
        Long Break
      </button>
    </div>
  );
}

export default ModeSwitcher;
