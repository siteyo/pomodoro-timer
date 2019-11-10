import React from 'react';
import Timer from 'containers/TimerContainer';

import Container from '@material-ui/core/Container';

const App: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <header>
        <h1>Pomodoro Timer</h1>
      </header>
      <Timer />
    </Container>
  );
};

export default App;
