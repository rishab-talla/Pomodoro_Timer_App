import React, { useRef } from "react";
import useTimer from "./hooks/useTimer";
import Timer from "./components/Timer";
import ModeSwitcher from "./components/ModeSwitcher";
import Controls from "./components/Controls";

function App() {
  const defaults = { work: 25, shortBreak: 5, longBreak: 15 };
  const audioRef = useRef(null);

  const handleSessionEnd = (endedMode) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Failed to play notification sound:", err);
        });
      }
    }
  };

  const {
    timeLeft,
    mode,
    isRunning,
    sessions,
    start,
    pause,
    resetTimer,
    resetSessions,
    resetAll,
    setMode,
  } = useTimer(defaults, { onSessionEnd: handleSessionEnd });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Pomodoro Timer</h1>

      <ModeSwitcher currentMode={mode} setMode={setMode} />

      <Timer timeLeft={timeLeft} mode={mode} />

      <Controls
        isRunning={isRunning}
        start={start}
        pause={pause}
        resetTimer={resetTimer}
        resetSessions={resetSessions}
        resetAll={resetAll}
      />

      <p className="mt-4 text-gray-400">Sessions Completed: {sessions}</p>

      <audio
        ref={audioRef}
        src="/notifications.wav"
        preload="auto"
        aria-hidden="true"
      />
    </div>
  );
}

export default App;
