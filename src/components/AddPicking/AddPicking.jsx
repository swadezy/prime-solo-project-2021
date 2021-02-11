import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// this view is used to add new locks to a user's account
function AddPicking() {
  const dispatch = useDispatch();
  const history = useHistory();
  const locks = useSelector((store) => store.locks);
  // saves picking-to-add in state so it can be dispatched easily on submit click
  // is this the right way to do it?
  const [newPicking, setNewPicking] = useState({
    lock_id: 0,
    success: 0,
    time_taken: '',
    date: Date(),
    notes: '',
  });

  // on page load, gets locks
  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_LOCKS' });
  }, []);

  // how to do input validation for this one?
  const handleAddPicking = (event) => {
    event.preventDefault();
    dispatch({ type: 'POST_PICKING', payload: newPicking });
    history.push('/viewHistory');
  };

  return (
    <Container maxWidth="md">
      <Paper>
        <Box m={3} p={3}>
          <form onSubmit={handleAddPicking}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h5">Add Picking</Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant="h6">Lock</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  select
                  label="Select"
                  value={newPicking.lock_id}
                  onChange={(event) =>
                    setNewPicking({
                      ...newPicking,
                      lock_id: event.target.value,
                    })
                  }
                >
                  <MenuItem value={0}>...</MenuItem>
                  {locks &&
                    locks.map((lock) => (
                      <MenuItem key={lock.id} value={lock.id}>
                        {lock.nickname}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant="h6">Success</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  select
                  label="Select"
                  value={newPicking.success}
                  onChange={(event) =>
                    setNewPicking({
                      ...newPicking,
                      success: event.target.value,
                    })
                  }
                >
                  <MenuItem value={0}>...</MenuItem>
                  <MenuItem value={true}>true</MenuItem>
                  <MenuItem value={false}>false</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant="h6">Time Taken</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={newPicking.time_taken}
                  onChange={(event) =>
                    setNewPicking({
                      ...newPicking,
                      time_taken: event.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant="h6">Date</Typography>
              </Grid>
              {/* <Grid item xs={6} sm={4}>
                <TextField
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={newPicking.date}
                  onChange={(event) =>
                    setNewPicking({ ...newPicking, date: event.target.value })
                  }
                />
              </Grid> */}
              <Grid item xs={6} sm={4}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    format="MM/dd/yyyy"
                    value={newPicking.date}
                    InputAdornmentProps={{ position: 'start' }}
                    onChange={(date) =>
                      setNewPicking({ ...newPicking, date: date })
                    }
                  />
                </MuiPickersUtilsProvider>
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
                  value={newPicking.notes}
                  onChange={(event) =>
                    setNewPicking({ ...newPicking, notes: event.target.value })
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
                    history.push('/');
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

export default AddPicking;
