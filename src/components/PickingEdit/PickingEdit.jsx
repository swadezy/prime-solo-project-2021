import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

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

  const routeBack = () => {
    // where do I put these clear reducers? in client or in sagas?
    dispatch({ type: 'CLEAR_PICKING' });
    history.push({ pathname: `/pickDetails/${picking.id}` });
  };

  return (
    <div>
      <p>Picking Edit id {picking.id}</p>
      {picking && (
        <form onSubmit={handleEdit}>
          <span>Time Taken -</span>
          <input
            value={picking.time_taken}
            onChange={(event) =>
              dispatch({
                type: 'SET_PICKING',
                payload: { ...picking, time_taken: event.target.value },
              })
            }
          />
          <br></br>
          <span>Date -</span>
          <input
            value={picking.date}
            onChange={(event) =>
              dispatch({
                type: 'SET_PICKING',
                payload: { ...picking, date: event.target.value },
              })
            }
          />
          <br></br>
          <span>Notes -</span>
          <input
            value={picking.notes}
            onChange={(event) =>
              dispatch({
                type: 'SET_PICKING',
                payload: { ...picking, notes: event.target.value },
              })
            }
          />
          <br></br>
          <button type="submit">Submit</button>
          <button onClick={routeBack}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default PickingEdit;
