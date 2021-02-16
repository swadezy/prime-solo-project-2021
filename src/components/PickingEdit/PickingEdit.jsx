import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// this component allows the user to edit lock information for each lock in their account
function PickingEdit() {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const picking = useSelector((store) => store.pickDetails);

  useEffect(() => {
    dispatch({ type: 'FETCH_PICKING_DETAILS', payload: page.id });
  }, []);

  const handleEdit = (event) => {
    event.preventDefault();
    dispatch({ type: 'UPDATE_PICKING', payload: picking });
    history.push({ pathname: `/pickDetails/${picking.id}` });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_PICKING', payload: picking.id });
    dispatch({ type: 'CLEAR_PICKINGS' });
    dispatch({ type: 'FETCH_ALL_PICKINGS' });
    history.push({ pathname: '/viewHistory' });
  };

  const routeBack = () => {
    // where do I put these clear reducers? in client or in sagas?
    dispatch({ type: 'CLEAR_PICKING' });
    history.push({ pathname: `/pickDetails/${picking.id}` });
  };

  return (
    <Container maxWidth="md">
      <Paper>
        <Box m={3} p={3}>
          <form onSubmit={handleEdit}>
            <Grid container spacing={3} alignItems="center">
              {picking.id && (
                <Grid item xs={10}>
                  <Typography variant="h5">
                    Edit Picking Event #{picking.id}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={2}>
                <Button
                  color="primary"
                  variant="outlined"
                  startIcon={<DeleteForeverIcon />}
                  aria-label="Delete lock"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography variant="h6">Time Taken</Typography>
              </Grid>
              {picking.time_taken && (
                <Grid item xs={12} sm={10}>
                  <TextField
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    value={picking?.time_taken}
                    onChange={(event) =>
                      dispatch({
                        type: 'SET_PICKING',
                        payload: {
                          ...picking,
                          time_taken: event.target.value,
                        },
                      })
                    }
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={2}>
                <Typography variant="h6">Date</Typography>
              </Grid>
              {picking.date && (
                <Grid item xs={12} sm={10}>
                  <TextField
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    value={picking?.date}
                    onChange={(event) =>
                      dispatch({
                        type: 'SET_PICKING',
                        payload: {
                          ...picking,
                          date: event.target.value,
                        },
                      })
                    }
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={2}>
                <Typography variant="h6">Notes</Typography>
              </Grid>
              {picking.time_taken && (
                <Grid item xs={12} sm={10}>
                  <TextField
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    value={picking?.notes}
                    onChange={(event) =>
                      dispatch({
                        type: 'SET_PICKING',
                        payload: {
                          ...picking,
                          notes: event.target.value,
                        },
                      })
                    }
                  />
                </Grid>
              )}
              <Grid container item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Submit
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
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

export default PickingEdit;
