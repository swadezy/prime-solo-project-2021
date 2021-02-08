import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ViewLocks() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_LOCKS' });
  }, []);

  const locks = useSelector((store) => store.locks);

  return (
    <div>
      <p>ViewLocks</p>
      <p>{JSON.stringify(locks)}</p>
    </div>
  );
}

export default ViewLocks;
