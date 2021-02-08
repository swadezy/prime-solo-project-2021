import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function LockDetails() {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const lock = useSelector((store) => store?.locks)[0];

  useEffect(() => {
    dispatch({ type: 'FETCH_LOCK_DETAIL', payload: page.id });
  }, []);

  const handleDelete = () => {
    // swal alert?
    console.log('clicked delete for lock', page.id);
    dispatch({ type: 'DELETE_LOCK', payload: page.id });
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
              history.push({ pathname: `/edit/${lock.id}` });
            }}
          >
            Edit
          </button>
          <button onClick={handleDelete}>Delete</button>
          <button
            onClick={() => {
              history.push('/viewLocks');
            }}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}

export default LockDetails;
