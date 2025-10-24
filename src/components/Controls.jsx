export default function Controls({
  isRunning,
  start,
  pause,
  resetTimer,
  resetSessions,
  resetAll,
}) {
  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {isRunning ? (
        <button
          onClick={pause}
          className="px-4 py-2 bg-yellow-500 rounded-xl"
        >
          Pause
        </button>
      ) : (
        <button
          onClick={start}
          className="px-4 py-2 bg-green-500 rounded-xl"
        >
          Start
        </button>
      )}

      <button
        onClick={resetTimer}
        className="px-4 py-2 bg-gray-600 rounded-xl"
      >
        Reset Timer
      </button>

      <button
        onClick={resetSessions}
        className="px-4 py-2 bg-red-600 rounded-xl"
      >
        Reset Sessions
      </button>

      {/* Optionally, a “full reset” button */}
      {resetAll && (
        <button
          onClick={resetAll}
          className="px-4 py-2 bg-blue-600 rounded-xl"
        >
          Reset All
        </button>
      )}
    </div>
  );
}
