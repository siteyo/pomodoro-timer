import React, { FC, ChangeEvent } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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
  textField: {
    marginLeft: 1,
    marginRight: 1,
    width: 200,
    display: 'block',
  },
});

interface TimerProps {
  timeLeft: number;
  workMinutes: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  handleChangeTimeLeft: (ev: ChangeEvent<HTMLInputElement>) => void;
}

const TimerComponent: FC<TimerProps> = ({
  timeLeft,
  workMinutes,
  start,
  stop,
  reset,
  handleChangeTimeLeft,
}) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.time}>
            {Math.floor(timeLeft / 60)}:{('00' + (timeLeft % 60)).slice(-2)}
          </Typography>

          <TextField
            className={classes.textField}
            label="Work [min]"
            type="number"
            defaultValue={workMinutes}
            onChange={handleChangeTimeLeft}
          />
          <TextField
            className={classes.textField}
            label="Interval [min]"
            type="number"
            defaultValue={5}
          />
          <TextField
            className={classes.textField}
            label="Repeat"
            type="number"
            defaultValue={4}
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
