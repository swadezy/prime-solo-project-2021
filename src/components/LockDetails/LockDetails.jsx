import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

// this view displays more robust information on a lock than is available on the view locks page
function LockDetails() {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const lock = useSelector((store) => store.lockDetails);

  useEffect(() => {
    // where do I put these clear reducers? in client or in sagas?
    dispatch({ type: 'CLEAR_LOCK' });
    dispatch({ type: 'FETCH_LOCK_DETAILS', payload: page.id });
  }, []);

  const handleDelete = () => {
    // swal?
    dispatch({ type: 'DELETE_LOCK', payload: page.id });
    history.push('/viewLocks');
  };

  const routeBack = () => {
    dispatch({ type: 'CLEAR_LOCK' });
    history.push('/viewLocks');
  };

  return (
    <div>
      <p>Lock Details</p>
      {lock && (
        <div>
          <p>Nickname : {lock.nickname}</p>
          <p>Brand : {lock.brand}</p>
          <p>Type : {lock.type}</p>
          <p>Number of Pins : {lock.num_pins}</p>
          <p>Notes : {lock.notes}</p>
          <button
            onClick={() => {
              history.push({ pathname: `/lockEdit/${lock.id}` });
            }}
          >
            Edit
          </button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={routeBack}>Back</button>
        </div>
      )}
    </div>
  );
}

export default LockDetails;
