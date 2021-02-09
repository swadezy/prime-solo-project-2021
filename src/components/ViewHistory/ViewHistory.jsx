import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ViewHistory() {
  const dispatch = useDispatch();
  const pickings = useSelector((store) => store.pickings);

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_PICKINGS' });
  }, []);

  return (
    <div>
      <p>View History</p>
      <p>{JSON.stringify(pickings)}</p>
    </div>
  );
}

export default ViewHistory;
