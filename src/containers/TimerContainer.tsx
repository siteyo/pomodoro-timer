import React, { FC, useEffect, useState, ChangeEvent } from 'react';

import TimerComponent from 'components/TimerComponent';

const useTimer = (
  workMinutes: number,
  intervalMinutes: number,
  maxRepeatCount: number,
): [
  number,
  number,
  () => void,
  () => void,
  () => void,
  (ev: ChangeEvent<HTMLInputElement>) => void,
] => {
  const [limitMin, setLimitMin] = useState(workMinutes);
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
  const [timerId, setTimerId] = useState();

  const reset = () => {
    setTimeLeft(limitMin * 60);
  };

  const tick = () => {
    setTimeLeft(prevTime => (prevTime === 0 ? limitMin * 60 : prevTime - 1));
  };

  const start = () => {
    const timerId = setInterval(tick, 1000);
    setTimerId(timerId);
  };

  const stop = () => {
    clearInterval(timerId);
  };

  const handleChangeTimeLeft = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    setLimitMin(parseInt(ev.currentTarget.value));
  };

  useEffect(() => {
    if (Number.isNaN(limitMin)) {
      setTimeLeft(0);
    } else {
      setTimeLeft(limitMin * 60);
    }
    return () => clearInterval(timerId);
    // eslint-disable-next-line
  }, [limitMin]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timerId);
    }
    // eslint-disable-next-line
  }, [timeLeft]);

  return [timeLeft, workMinutes, start, stop, reset, handleChangeTimeLeft];
};

const TimerContainer: FC = () => {
  const WORK_MINUTES = 25;
  const INTERVAL_MINUTES = 5;
  const REPEAT = 4;

  const [
    timeLeft,
    workMinutes,
    start,
    stop,
    reset,
    handleChangeTimeLeft,
  ] = useTimer(WORK_MINUTES, INTERVAL_MINUTES, REPEAT);

  return (
    <TimerComponent
      timeLeft={timeLeft}
      workMinutes={workMinutes}
      start={start}
      stop={stop}
      reset={reset}
      handleChangeTimeLeft={handleChangeTimeLeft}
    />
  );
};

export default TimerContainer;
