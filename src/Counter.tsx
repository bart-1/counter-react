import React, { ChangeEvent, useEffect, useState } from "react";
import "./Counter.css";
import Theme from "./Theme";

const Counter = () => {
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerHours, setTimerHours] = useState("00");

  const [timerSecondsInput, setTimerSecondsInput] = useState("00");
  const [timerMinutesInput, setTimerMinutesInput] = useState("00");
  const [timerHoursInput, setTimerHoursInput] = useState("00");

  const [timerTic, setTimerTic] = useState(0);

  const [startTimer, setStartTimer] = useState(false);
  const [countdown, setCountdown] = useState(false);
  const [inputAction, setInputAction] = useState(false);

  const resetInput = () => {
    setTimerHoursInput("00");
    setTimerMinutesInput("00");
    setTimerSecondsInput("00");
  };
  const reset = () => {
    setStartTimer(false);
    setTimerTic(0);
    resetInput();
  };

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    let ticInterval = 0;
    let tic = 0;

    if (startTimer) {
      countdown && timerTic > 0 ? (tic = -1) : (tic = 1);

      setTimerTic(
        (prevState) =>
          (prevState +=
            Number(timerHoursInput) * 3600 +
            Number(timerMinutesInput) * 60 +
            Number(timerSecondsInput))
      );
      setInputAction(false);
      resetInput();
      ticInterval = setInterval(() => {
        setTimerTic((prevState) => (prevState += tic));
      }, 1000);
    }
    return () => {
      clearInterval(ticInterval);
    };
  }, [startTimer, countdown]);

  useEffect(() => {
    const hours = Math.floor(timerTic / 3600);
    const minutes = Math.floor((timerTic % 3600) / 60);
    const seconds = Math.floor((timerTic % 3600) % 60);
    setTimerHours(("0" + hours).slice(-2));
    setTimerMinutes(("0" + minutes).slice(-2));
    setTimerSeconds(("0" + seconds).slice(-2));

    if (timerTic === 0) reset();
  }, [timerTic]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputAction(true);
    setTimerTic(0);
    const validatedValue = value.match(/^[0-9]*$/);

    if (validatedValue !== null) {
      name === "hours" && setTimerHoursInput(validatedValue.toString());
      name === "minutes" && setTimerMinutesInput(validatedValue.toString());
      name === "seconds" &&
        setTimerSecondsInput(validatedValue.toLocaleString());
    }
  };

  return (
    <div className="timer">
      <div className="timer-digits">
        <input
          name="hours"
          type="text"
          value={inputAction ? timerHoursInput : timerHours}
          onChange={(e) => handleInputChange(e)}
          maxLength={2}
        />
        :
        <input
          name="minutes"
          type="text"
          value={inputAction ? timerMinutesInput : timerMinutes}
          onChange={(e) => handleInputChange(e)}
          maxLength={2}
        />
        :
        <input
          name="seconds"
          type="text"
          value={inputAction ? timerSecondsInput : timerSeconds}
          onChange={(e) => handleInputChange(e)}
          maxLength={2}
        />
      </div>
      <div className="timer-buttons">
        <button onClick={() => setStartTimer((prevState) => !prevState)}>
          Start/Stop
        </button>
        <button onClick={reset}>Reset</button>
        <button
          onClick={() =>
            timerTic > 0
              ? setCountdown((prevState) => !prevState)
              : setCountdown(false)
          }>
          {countdown && timerTic > 0 ? `Countdown` : `Countup`}
        </button>
        <Theme />
      </div>
    </div>
  );
};

export default Counter;
