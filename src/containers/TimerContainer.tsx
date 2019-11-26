import React, { FC, useEffect, useState } from 'react';

import TimerComponent from 'components/TimerComponent';

const useTimer = (
  workMinutes: number,
  intervalMinutes: number,
  repeatCountMax: number,
): [
  number,
  boolean,
  number,
  () => void,
  () => void,
  () => void,
  { workMinutes: number; intervalMinutes: number; repeatCountMax: number },
  (targetName: string, newValue: number) => void,
] => {
  const [inputValues, setInputValues] = useState({
    workMinutes: workMinutes,
    intervalMinutes: intervalMinutes,
    repeatCountMax: repeatCountMax,
  });
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
  const [repeatCount, setRepeatCount] = useState(0);
  const [timerId, setTimerId] = useState();
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [active, setActive] = useState(false);

  const tick = () => {
    setTimeLeft(prevTime => prevTime - 1);
  };

  const start = () => {
    if (!active) {
      setTimerId(setInterval(tick, 1000));
      setActive(true);
    }
  };

  const stop = () => {
    if (active) {
      clearInterval(timerId);
      setActive(false);
    }
  };

  const reset = () => {
    if (active) {
      clearInterval(timerId);
    }
    setTimeLeft(inputValues.workMinutes * 60);
    setIsWorkTime(true);
    setRepeatCount(0);
  };

  const handleChange = (targetName: string, newValue: number) => {
    setInputValues(v => ({ ...v, [targetName]: newValue }));
  };

  useEffect(() => {
    return () => clearInterval(timerId);
  }, [timerId]);

  useEffect(() => {
    setTimeLeft(inputValues.workMinutes * 60);
    setIsWorkTime(true);
    setRepeatCount(0);
    setActive(false);
  }, [inputValues]);

  useEffect(() => {
    if (active && timeLeft === 0) {
      setIsWorkTime(prev => !prev);
    }
  }, [timeLeft, active]);

  useEffect(() => {
    if (active) {
      if (isWorkTime) {
        setRepeatCount(prevCount => prevCount + 1);
        setTimeLeft(inputValues.workMinutes * 60);
      } else {
        setTimeLeft(inputValues.intervalMinutes * 60);
      }
    }
  }, [isWorkTime]); //eslint-disable-line

  return [
    timeLeft,
    active,
    repeatCount,
    start,
    stop,
    reset,
    inputValues,
    handleChange,
  ];
};

const TimerContainer: FC = () => {
  const WORK_MINUTES = 25;
  const INTERVAL_MINUTES = 5;
  const REPEAT = 4;

  const [
    timeLeft,
    active,
    repeatCount,
    start,
    stop,
    reset,
    inputValues,
    handleChange,
  ] = useTimer(WORK_MINUTES, INTERVAL_MINUTES, REPEAT);

  return (
    <TimerComponent
      timeLeft={timeLeft}
      active={active}
      start={start}
      stop={stop}
      reset={reset}
      inputValues={inputValues}
      handleChange={handleChange}
    />
  );
};

export default TimerContainer;
