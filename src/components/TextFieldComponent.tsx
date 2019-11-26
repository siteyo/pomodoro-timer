import React, { FC } from 'react';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

interface TextFieldProps {
  handleChange: (targetName: string, newValue: number) => void;
  targetName: string;
  label: string;
  disabled: boolean;
  value?: number;
}

const useStyles = makeStyles({
  textField: {
    marginLeft: 1,
    marginRight: 1,
    width: 200,
    display: 'block',
  },
});

const TextFieldComponent: FC<TextFieldProps> = ({
  handleChange,
  targetName,
  label,
  disabled,
  value = 0,
}) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.textField}
      label={label}
      type="number"
      disabled={disabled}
      onChange={event => handleChange(targetName, Number(event.target.value))}
      defaultValue={value}
    />
  );
};

export default TextFieldComponent;
