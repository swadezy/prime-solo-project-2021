import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LockCard from '../LockCard/LockCard';

function ViewLocks() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_LOCKS' });
  }, []);

  const locks = useSelector((store) => store.locks);

  return (
    <div>
      <p>ViewLocks</p>
      {locks && locks.map((lock) => (
          <LockCard key={lock.id} lock={lock} />
      ))}
    </div>
  );
}

export default ViewLocks;
