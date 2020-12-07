import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Add from '@material-ui/icons/Add';
import React, { useState } from 'react';

export default function Home() {
  const [speed, setSpeed] = useState(3);

  return (
    <div>
      <Container>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setSpeed(speed > 0.1 ? speed - 0.1 : speed)}>
          Fast
        </Button>
        <Box display="flex" width="100%" height="80vh" alignItems="center" justifyContent="center">
          <img
            style={{ animation: `spin ${speed}s linear infinite` }}
            src="https://lestream.fr/img/streamers/88301612-1527163005.jpg"
          />
        </Box>
      </Container>
    </div>
  );
}
