import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ViewLocks() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_LOCKS' });
  }, []);

  const locks = useSelector((store) => store.locks);

  return (
    <div>
      <span>ViewLocks</span>
      <span>{JSON.stringify(locks)}</span>
    </div>
  );
}

export default ViewLocks;
