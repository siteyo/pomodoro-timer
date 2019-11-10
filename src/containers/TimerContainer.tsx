import React, { FC, useEffect, useState } from 'react';

import TimerComponent from 'components/TimerComponent';

const useTimer = (limitSec: number): [number, () => void] => {
  const [timeLeft, setTimeLeft] = useState(limitSec);

  const reset = () => {
    setTimeLeft(limitSec);
  };

  const tick = () => {
    setTimeLeft(prevTime => (prevTime === 0 ? limitSec : prevTime - 1));
  };

  useEffect(() => {
    const timerId = setInterval(tick, 1000);

    return () => clearInterval(timerId);
    // eslint-disable-next-line
  }, []);

  return [timeLeft, reset];
};

const TimerContainer: FC = () => {
  const LIMIT = 60 * 12;
  const [timeLeft, reset] = useTimer(LIMIT);

  return <TimerComponent timeLeft={timeLeft} reset={reset} />;
};

export default TimerContainer;
