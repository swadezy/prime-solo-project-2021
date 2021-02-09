import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button, TextField, Typography } from '@material-ui/core';

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
    <div>
      <Typography variant="h5">Add Lock</Typography>
      <form onSubmit={handleAddLock}>
        <Typography display="inline">Nickname</Typography>
        <TextField
          variant="outlined"
          value={newLock.nickname}
          onChange={(event) =>
            setNewLock({ ...newLock, nickname: event.target.value })
          }
        />
        <br></br>
        <Typography display="inline">Brand</Typography>
        <select
          value={newLock.brand_id}
          onChange={(event) =>
            setNewLock({ ...newLock, brand_id: event.target.value })
          }
        >
          <option value={0}>...select brand</option>
          {brands &&
            brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.brand}
              </option>
            ))}
        </select>
        <br></br>

        <Typography display="inline">Type</Typography>
        <select
          value={newLock.type_id}
          onChange={(event) =>
            setNewLock({ ...newLock, type_id: event.target.value })
          }
        >
          <option value={0}>...select type</option>
          {types &&
            types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.type}
              </option>
            ))}
        </select>
        <br></br>

        <Typography display="inline">Number of Pins</Typography>
        <input
          value={newLock.num_pins}
          onChange={(event) =>
            setNewLock({ ...newLock, num_pins: event.target.value })
          }
        />
        <br></br>

        <Typography display="inline">Image Upload</Typography>
        <input
          value={newLock.img_url}
          onChange={(event) =>
            setNewLock({ ...newLock, img_url: event.target.value })
          }
        />
        <br></br>

        <Typography display="inline">Notes</Typography>
        <input
          value={newLock.notes}
          onChange={(event) =>
            setNewLock({ ...newLock, notes: event.target.value })
          }
        />
        <br></br>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            history.push('/');
          }}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default AddLock;
