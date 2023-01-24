import React, { useState, useEffect, Fragment } from "react";

let timerId;
function Timer() {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [displayTime, setDisplayTime] = useState("00:00");
  const [isPlay, setIsPlay] = useState(null);

  useEffect(() => {
    if (totalTime < 0 || !isPlay) return;
    timerId = setTimeout(() => {
      console.log("timer set", totalTime);
      const sec = String(totalTime % 60);
      const min = String(Math.floor(totalTime / 60));
      setTotalTime((prevTime) => prevTime - 1);
      setDisplayTime(`${min.padStart(2, 0)}:${sec.padStart(2, 0)}`);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [totalTime, isPlay]);

  function handleInputChange(event) {
    const { target } = event;
    if (target.name === "minutes") {
      setMinutes(target.value);
      return;
    }
    setSeconds(target.value);
  }

  function handleStart() {
    setIsPlay(true);
    const time = Number(minutes) * 60 + Number(seconds);
    const sec = String(time % 60);
    const min = String(Math.floor(time / 60));
    setDisplayTime(`${min.padStart(2, 0)}:${sec.padStart(2, 0)}`);
    setTotalTime(time - 1);
  }

  function handlePauseResume() {
    if (isPlay === null) return;
    if (isPlay) {
      clearTimeout(timerId);
      setIsPlay(!isPlay);
      return;
    }
    console.log({ totalTime });
    setIsPlay(!isPlay);
    setTotalTime(totalTime);
  }

  function handleReset() {
    setMinutes(0);
    setSeconds(0);
    setTotalTime("");
    setDisplayTime("00:00");
    setIsPlay(false);
  }

  return (
    <Fragment>
      <label>
        <input
          name="minutes"
          type="number"
          value={minutes}
          onChange={handleInputChange}
        />
        Minutes
      </label>
      <label>
        <input
          name="seconds"
          type="number"
          value={seconds}
          onChange={handleInputChange}
        />
        Seconds
      </label>

      <button onClick={handleStart}>START</button>
      <button onClick={handlePauseResume}>PAUSE / RESUME</button>
      <button onClick={handleReset}>RESET</button>

      <h1 data-testid="running-clock">{displayTime}</h1>
    </Fragment>
  );
}

export default Timer;
