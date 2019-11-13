import React, { FC, useEffect, useState } from 'react';

import TimerComponent from 'components/TimerComponent';

const useTimer = (
  limitSec: number,
): [number, () => void, () => void, () => void] => {
  const [timeLeft, setTimeLeft] = useState(limitSec);
  const [timerId, setTimerId] = useState();

  const reset = () => {
    setTimeLeft(limitSec);
  };

  const tick = () => {
    setTimeLeft(prevTime => (prevTime === 0 ? limitSec : prevTime - 1));
  };

  const start = () => {
    const timerId = setInterval(tick, 1000);
    setTimerId(timerId);
  };

  const stop = () => {
    clearInterval(timerId);
  };

  useEffect(() => {
    return () => clearInterval(timerId);
    // eslint-disable-next-line
  }, []);

  return [timeLeft, start, stop, reset];
};

const TimerContainer: FC = () => {
  const LIMIT = 60;
  const [timeLeft, start, stop, reset] = useTimer(LIMIT);

  return (
    <TimerComponent
      timeLeft={timeLeft}
      start={start}
      stop={stop}
      reset={reset}
    />
  );
};

export default TimerContainer;
