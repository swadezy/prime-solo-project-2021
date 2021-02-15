import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

// this component allows the user to edit lock information for each lock in their account
function LockEdit() {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_LOCK_DETAILS', payload: page.id });
    dispatch({ type: 'FETCH_BRANDS' });
    dispatch({ type: 'FETCH_TYPES' });
  }, []);

  const lock = useSelector((store) => store.lockDetails);
  const brands = useSelector((store) => store.brands);
  const types = useSelector((store) => store.types);

  const handleEdit = (event) => {
    event.preventDefault();
    dispatch({ type: 'UPDATE_LOCK', payload: lock });
    dispatch({ type: 'CLEAR_LOCK' });
    // where do I put these clear reducers? in client or in sagas?
    dispatch({ type: 'CLEAR_LOCKS' });
    dispatch({ type: 'FETCH_ALL_LOCKS' });
    history.push({ pathname: '/viewLocks' });
  };

  return (
    <Container maxWidth="md">
      <Paper>
        <Box m={3} p={3}>
          <form onSubmit={handleEdit}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h5">Edit Lock</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography variant="h6">Nickname</Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={lock.nickname}
                  onChange={(event) =>
                    dispatch({
                      type: 'SET_LOCK',
                      payload: { ...lock, nickname: event.target.value },
                    })
                  }
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography display="inline" variant="h6">
                  Brand
                </Typography>
              </Grid>
              {brands.length && (
                <Grid item xs={6} sm={4}>
                  <TextField
                    color="secondary"
                    variant="outlined"
                    fullWidth
                    select
                    label="Select"
                    value={lock.brand_id}
                    onChange={(event) =>
                      dispatch({
                        type: 'SET_LOCK',
                        payload: { ...lock, brand_id: event.target.value },
                      })
                    }
                  >
                    <MenuItem value={0}>...</MenuItem>
                    {brands?.map((brand) => (
                      <MenuItem key={brand.id} value={brand.id}>
                        {brand.brand}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}
              <Grid item xs={6} sm={2}>
                <Typography display="inline" variant="h6">
                  Type
                </Typography>
              </Grid>
              {types.length && (
                <Grid item xs={6} sm={4}>
                  <TextField
                    color="secondary"
                    variant="outlined"
                    fullWidth
                    select
                    label="Select"
                    value={lock.type_id}
                    onChange={(event) =>
                      dispatch({
                        type: 'SET_LOCK',
                        payload: { ...lock, type_id: event.target.value },
                      })
                    }
                  >
                    <MenuItem value={0}>...</MenuItem>
                    {types?.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}
              <Grid item xs={6} sm={2}>
                <Typography display="inline" variant="h6">
                  # of Pins
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={lock.num_pins}
                  onChange={(event) =>
                    dispatch({
                      type: 'SET_LOCK',
                      payload: { ...lock, num_pins: event.target.value },
                    })
                  }
                />
              </Grid>

              <Grid item xs={6} sm={2}>
                <Typography display="inline" variant="h6">
                  Image Upload
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={lock.img_url}
                  onChange={(event) =>
                    dispatch({
                      type: 'SET_LOCK',
                      payload: { ...lock, img_url: event.target.value },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography display="inline" variant="h6">
                  Notes
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  multiline
                  rows={2}
                  value={lock.notes}
                  onChange={(event) =>
                    dispatch({
                      type: 'SET_LOCK',
                      payload: { ...lock, notes: event.target.value },
                    })
                  }
                />
              </Grid>
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
                  onClick={() => {
                    history.push('/viewLocks');
                  }}
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

export default LockEdit;
