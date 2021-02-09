import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
    time_taken: 0,
    date: '2000-01-01',
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
    <div>
      <p>Add Picking</p>
      <form onSubmit={handleAddPicking}>
        <span>Lock - </span>
        <select
          value={newPicking.lock_id}
          onChange={(event) =>
            setNewPicking({ ...newPicking, lock_id: event.target.value })
          }
        >
          <option value={0}>...select lock</option>
          {locks &&
            locks.map((lock) => (
              <option key={lock.id} value={lock.id}>
                {lock.nickname}
              </option>
            ))}
        </select>
        <br></br>
        <span>Success - </span>
        <select
          value={newPicking.success}
          onChange={(event) =>
            setNewPicking({ ...newPicking, success: event.target.value })
          }
        >
          <option value={0}>...select</option>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
        <br></br>
        <span>Time Taken -</span>
        <input
          value={newPicking.time_taken}
          onChange={(event) =>
            setNewPicking({ ...newPicking, time_taken: event.target.value })
          }
        />
        <br></br>
        <span>Date -</span>
        <input
          value={newPicking.date}
          onChange={(event) =>
            setNewPicking({ ...newPicking, date: event.target.value })
          }
        />
        <br></br>
        <span>Notes -</span>
        <input
          value={newPicking.notes}
          onChange={(event) =>
            setNewPicking({ ...newPicking, notes: event.target.value })
          }
        />
        <br></br>
        <button type="submit">Submit</button>
        <button
          onClick={() => {
            history.push('/');
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddPicking;
