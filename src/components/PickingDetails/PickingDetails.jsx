import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';

// this view displays more robust information for a picking than is available on the view history page
function PickingDetails() {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const picking = useSelector((store) => store.pickDetails);

  useEffect(() => {
    // where do I put these clear reducers? in client or in sagas?
    dispatch({ type: 'CLEAR_PICKING' });
    dispatch({ type: 'FETCH_PICKING_DETAILS', payload: page.id });
  }, []);

  const routeBack = () => {
    dispatch({ type: 'CLEAR_PICKING' });
    history.push('/viewHistory');
  };

  return (
    <Container maxWidth="md">
      <Paper>
        <Box m={3} p={3}>
          {picking && (
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h5">
                  Picking Event #{picking.id}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Lock : {picking.nickname}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Time Taken : {picking.time_taken}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Date : {picking.date}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Notes : {picking.notes}</Typography>
              </Grid>
              {/* success */}
              <Grid item xs={12}>
                <Typography>Brand : {picking.brand}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Type : {picking.type}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Number of Pins : {picking.num_pins}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Lock Notes : {picking.lock_notes}</Typography>
              </Grid>

              <Grid container item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => {
                    history.push({ pathname: `/pickEdit/${picking.id}` });
                  }}
                  fullWidth
                >
                  Edit
                </Button>
              </Grid>
              <Grid container item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="default"
                  size="large"
                  fullWidth
                  onClick={routeBack}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default PickingDetails;
