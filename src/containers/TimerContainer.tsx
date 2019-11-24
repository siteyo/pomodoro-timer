import React, { FC, useEffect, useState } from 'react';

import TimerComponent from 'components/TimerComponent';

const TimerContainer: FC = () => {
  const WORK_MINUTES = 25;
  const INTERVAL_MINUTES = 5;
  const REPEAT = 4;

  const [inputValues, setInputValues] = useState({
    workMinutes: WORK_MINUTES,
    intervalMinutes: INTERVAL_MINUTES,
    repeatCount: REPEAT,
  });
  const [timeLeft, setTimeLeft] = useState(WORK_MINUTES * 60);
  const [repeatCount, setRepeatCount] = useState(0);
  const [timerId, setTimerId] = useState();
  const [isWorkTime, setIsWorkTime] = useState(true);

  const tick = () => {
    setTimeLeft(prevTime => prevTime - 1);
  };

  const start = () => {
    const timerId = setInterval(tick, 1000);
    setTimerId(timerId);
  };

  const stop = () => {
    clearInterval(timerId);
  };

  const reset = () => {
    setTimeLeft(inputValues.workMinutes * 60);
    setIsWorkTime(true);
    setRepeatCount(0);
  };

  const handleChange = (targetName: string, newValue: number) => {
    setInputValues(v => ({ ...v, [targetName]: newValue }));
  };

  useEffect(() => {
    setTimeLeft(inputValues.workMinutes * 60);
    setIsWorkTime(true);
    setRepeatCount(0);
  }, [inputValues]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsWorkTime(prev => !prev);
      if (isWorkTime) {
        setRepeatCount(prev => prev + 1);
        setTimeLeft(inputValues.intervalMinutes * 60);
      } else {
        setTimeLeft(inputValues.workMinutes * 60);
      }
    }
  }, [timeLeft]);

  return (
    <TimerComponent
      timeLeft={timeLeft}
      start={start}
      stop={stop}
      reset={reset}
      inputValues={inputValues}
      handleChange={handleChange}
    />
  );
};

export default TimerContainer;
