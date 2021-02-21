import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

// this view is used to add new locks to a user's account
function AddLock() {
  const dispatch = useDispatch();
  const history = useHistory();
  const brands = useSelector((store) => store.brands);
  const types = useSelector((store) => store.types);
  // saves lock-to-add in state so it can be dispatched easily on submit click
  // is this the right way to do it?
  const [newLock, setNewLock] = useState({
    nickname: '',
    brand_id: 0,
    type_id: 0,
    num_pins: '',
    img_url: '',
    notes: '',
  });

  // on page load, gets brands and types
  useEffect(() => {
    dispatch({ type: 'FETCH_BRANDS' });
    dispatch({ type: 'FETCH_TYPES' });
  }, []);

  // validates that inputs are complete, then tells sagas to add the new lock
  const handleAddLock = (event) => {
    event.preventDefault();
    if (newLock.nickname) {
      dispatch({ type: 'POST_LOCK', payload: newLock });
      history.push('/viewLocks');
    } else {
      // need to add input validation to client
      console.log('complete all fields');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper>
        <Box m={3} p={3}>
          <form onSubmit={handleAddLock}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h5">Add Lock</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography variant="h6">Nickname</Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={newLock.nickname}
                  onChange={(event) =>
                    setNewLock({ ...newLock, nickname: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography display="inline" variant="h6">
                  Brand
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  select
                  label="Select"
                  value={newLock.brand_id}
                  onChange={(event) =>
                    setNewLock({ ...newLock, brand_id: event.target.value })
                  }
                >
                  <MenuItem value={0}>...</MenuItem>
                  {brands &&
                    brands.map((brand) => (
                      <MenuItem key={brand.id} value={brand.id}>
                        {brand.brand}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>

              <Grid item xs={6} sm={2}>
                <Typography display="inline" variant="h6">
                  Type
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  select
                  label="Select"
                  value={newLock.type_id}
                  onChange={(event) =>
                    setNewLock({ ...newLock, type_id: event.target.value })
                  }
                >
                  <MenuItem value={0}>...</MenuItem>
                  {types &&
                    types.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.type}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>

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
                  value={newLock.num_pins}
                  onChange={(event) =>
                    setNewLock({ ...newLock, num_pins: event.target.value })
                  }
                />
              </Grid>
              {/* image upload to come in later build */}
              {/* <Grid item xs={6} sm={2}>
                <Typography display="inline" variant="h6">
                  Image Upload
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={newLock.img_url}
                  onChange={(event) =>
                    setNewLock({ ...newLock, img_url: event.target.value })
                  }
                />
              </Grid> */}

<Grid item xs={6} sm={2}>
            
              </Grid>
              <Grid item xs={6} sm={4}>
               
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
                  value={newLock.notes}
                  onChange={(event) =>
                    setNewLock({ ...newLock, notes: event.target.value })
                  }
                />
              </Grid>
              <Grid container item xs={12} sm={6}>
                <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
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

export default AddLock;
