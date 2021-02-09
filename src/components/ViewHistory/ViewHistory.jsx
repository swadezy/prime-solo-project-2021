import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ViewHistory() {
  const dispatch = useDispatch();
  const pickings = useSelector((store) => store.pickings);
  const locks = useSelector((store) => store.locks);

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_PICKINGS' });
    dispatch({ type: 'FETCH_ALL_LOCKS' });
  }, []);

  return (
    <div>
      <p>View History</p>
      <span>Filter - </span>
      <select>
        <option value={0}>-</option>
        {locks &&
          locks.map((lock) => (
            <option key={lock.id} value={lock.id}>
              {lock.nickname}
            </option>
          ))}
      </select>
      {pickings.map((picking) => (
        <div>
          <p>Pick Event {picking.id}</p>
          <p>Picked {picking.nickname}</p>
          <button>Details</button>
        </div>
      ))}
      <p>{JSON.stringify(pickings)}</p>
    </div>
  );
}

export default ViewHistory;
