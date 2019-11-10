import React, { FC } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  card: {
    minWidth: 300,
  },
});

interface TimerProps {
  timeLeft: number;
  /* pause: () => void; */
  reset: () => void;
}

const TimerComponent: FC<TimerProps> = ({ timeLeft, reset }) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography>
            {Math.floor(timeLeft / 60)}:{timeLeft % 60}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={reset}>Reset</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default TimerComponent;
