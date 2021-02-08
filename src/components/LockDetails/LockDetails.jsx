import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function LockDetails() {
  const page = useParams();
  const dispatch = useDispatch();
  const lock = useSelector((store) => store.locks)[0];

  useEffect(() => {
    dispatch({ type: 'FETCH_LOCK_DETAIL', payload: page.id });
  }, []);

  return (
    <div>
      <p>Lock Details</p>
      <p>Nickname : {lock.nickname}</p>
      <p>Brand : {lock.brand}</p>
      <p>Type : {lock.type}</p>
      <p>Number of Pins : {lock.num_pins}</p>
      <p>Notes : {lock.notes}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}

export default LockDetails;
