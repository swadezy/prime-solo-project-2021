import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LockCard from '../LockCard/LockCard';

import { Container, Grid, Typography } from '@material-ui/core';

// this component shows the user all locks currently tied to their account
function ViewLocks() {
  const dispatch = useDispatch();
  const locks = useSelector((store) => store.locks);

  useEffect(() => {
    // where do I put these clear reducers? in client or in sagas?
    dispatch({ type: 'CLEAR_LOCKS' });
    dispatch({ type: 'FETCH_ALL_LOCKS' });
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12}>
          <Typography variant="h5">View Locks</Typography>
        </Grid>
        {locks &&
          locks.map((lock) => (
            <Grid key={lock.id} item xs={12} sm={6} md={3}>
              <LockCard lock={lock} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default ViewLocks;
