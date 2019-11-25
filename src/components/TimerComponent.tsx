import React, { FC } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import TextFieldComponent from 'components/TextFieldComponent';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  card: {
    minWidth: 300,
  },
  time: {
    fontSize: 40,
    textAlign: 'center',
    display: 'block',
  },
});

interface TimerProps {
  timeLeft: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  inputValues: {
    workMinutes: number;
    intervalMinutes: number;
    repeatCountMax: number;
  };
  handleChange: (targetName: string, newValue: number) => void;
}

const TimerComponent: FC<TimerProps> = ({
  timeLeft,
  start,
  stop,
  reset,
  inputValues,
  handleChange,
}) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.time}>
            {Math.floor(timeLeft / 60)}:{('00' + (timeLeft % 60)).slice(-2)}
          </Typography>
          <TextFieldComponent
            handleChange={handleChange}
            targetName="workMinutes"
            label="Work [min]"
            value={inputValues.workMinutes}
          />
          <TextFieldComponent
            handleChange={handleChange}
            targetName="intervalMinutes"
            label="Interval [min]"
            value={inputValues.intervalMinutes}
          />
          <TextFieldComponent
            handleChange={handleChange}
            targetName="repeatCount"
            label="Repeat"
            value={inputValues.repeatCountMax}
          />
        </CardContent>
        <CardActions>
          <Button onClick={start}>Start</Button>
          <Button onClick={stop}>Stop</Button>
          <Button onClick={reset}>Reset</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default TimerComponent;
