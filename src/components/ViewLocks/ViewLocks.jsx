import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LockCard from '../LockCard/LockCard';

// this component shows the user all locks currently tied to their account
function ViewLocks() {
  const dispatch = useDispatch();
  const locks = useSelector((store) => store.locks);

  useEffect(() => {
    // where do I put these clear reducers? in client or in sagas?
    dispatch({ type: 'CLEAR_LOCKS' });
    dispatch({ type: 'FETCH_ALL_LOCKS' });
  }, []);

  return (
    <div>
      <p>View Locks</p>
      {locks && locks.map((lock) => <LockCard key={lock.id} lock={lock} />)}
    </div>
  );
}

export default ViewLocks;
