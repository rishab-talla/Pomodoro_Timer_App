import { useState, useEffect, useRef, useCallback } from "react";

export default function useTimer(defaults, { onSessionEnd } = {}) {
  const { work, shortBreak, longBreak } = defaults;

  const [timeLeft, setTimeLeft] = useState(work * 60);
  const [mode, setMode] = useState("work"); // "work" | "shortBreak" | "longBreak"
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const timerRef = useRef(null);
  const hasHandledEndRef = useRef(false);

  const switchModeAfterCompletion = useCallback(() => {
    if (mode === "work") {
      setSessions((prevSessions) => {
        const newSessions = prevSessions + 1;
        const nextMode = newSessions % 4 === 0 ? "longBreak" : "shortBreak";
        setMode(nextMode);
        setTimeLeft(
          nextMode === "longBreak" ? longBreak * 60 : shortBreak * 60
        );
        return newSessions;
      });
    } else {
      setMode("work");
      setTimeLeft(work * 60);
    }
    hasHandledEndRef.current = true;
  }, [mode, work, shortBreak, longBreak]);

  useEffect(() => {
    hasHandledEndRef.current = false;
  }, [mode]);

  useEffect(() => {
    if (!isRunning) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);

          if (!hasHandledEndRef.current) {
            if (typeof onSessionEnd === "function") {
              onSessionEnd(mode);
            }
            switchModeAfterCompletion();
            setIsRunning(false);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning, mode, onSessionEnd, switchModeAfterCompletion]);

  const resetTimer = () => {
    setIsRunning(false);
    // Keep the same mode, but reset the time for it
    if (mode === "work") {
      setTimeLeft(work * 60);
    } else if (mode === "shortBreak") {
      setTimeLeft(shortBreak * 60);
    } else if (mode === "longBreak") {
      setTimeLeft(longBreak * 60);
    }
    hasHandledEndRef.current = false;
  };

  const resetSessions = () => {
    setSessions(0);
    // Reset the timer to the beginning of the current mode
    if (mode === "work") {
      setTimeLeft(work * 60);
    } else if (mode === "shortBreak") {
      setTimeLeft(shortBreak * 60);
    } else if (mode === "longBreak") {
      setTimeLeft(longBreak * 60);
    }
    setIsRunning(false);
    hasHandledEndRef.current = false;
  };

  const resetAll = () => {
    setIsRunning(false);
    setMode("work");
    setTimeLeft(work * 60);
    setSessions(0);
    hasHandledEndRef.current = false;
  };

  const manualSetMode = (newMode) => {
    setMode(newMode);
    if (newMode === "work") {
      setTimeLeft(work * 60);
    } else if (newMode === "shortBreak") {
      setTimeLeft(shortBreak * 60);
    } else if (newMode === "longBreak") {
      setTimeLeft(longBreak * 60);
    }
    setIsRunning(false);
    hasHandledEndRef.current = false;
  };

  return {
    timeLeft,
    mode,
    isRunning,
    sessions,
    start: () => {
      hasHandledEndRef.current = false;
      setIsRunning(true);
    },
    pause: () => setIsRunning(false),
    resetTimer,
    resetSessions,
    resetAll,
    setMode: manualSetMode,
  };
}
