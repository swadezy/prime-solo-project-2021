import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from '@material-ui/core';

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
    num_pins: 0,
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
      <p>Add Lock</p>
      <form onSubmit={handleAddLock}>
        <span>Nickname -</span>
        <input
          value={newLock.nickname}
          onChange={(event) =>
            setNewLock({ ...newLock, nickname: event.target.value })
          }
        />
        <br></br>

        <span>Brand - </span>
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

        <span>Type - </span>
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

        <span>Number of Pins -</span>
        <input
          value={newLock.num_pins}
          onChange={(event) =>
            setNewLock({ ...newLock, num_pins: event.target.value })
          }
        />
        <br></br>

        <span>Image Upload -</span>
        <input
          value={newLock.img_url}
          onChange={(event) =>
            setNewLock({ ...newLock, img_url: event.target.value })
          }
        />
        <br></br>

        <span>Notes -</span>
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
