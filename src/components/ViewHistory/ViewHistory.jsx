import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ViewHistory() {
  const dispatch = useDispatch();
  const history = useHistory();
  const pickings = useSelector((store) => store.pickings);
  const locks = useSelector((store) => store.locks);
  const brands = useSelector((store) => store.brands);
  const types = useSelector((store) => store.types);
  const filter = useSelector((store) => store.filter);

  useEffect(() => {
    dispatch({ type: 'CLEAR_FILTER' });
    dispatch({ type: 'FETCH_ALL_PICKINGS', payload: filter });
    dispatch({ type: 'FETCH_ALL_LOCKS' });
    dispatch({ type: 'FETCH_BRANDS' });
    dispatch({ type: 'FETCH_TYPES' });
  }, []);

  const handleFilter = () => {
    dispatch({ type: 'FETCH_ALL_PICKINGS', payload: filter });
  };

  return (
    <div>
      <p>View History</p>
      <span>Lock - </span>
      <select
        value={filter.lock}
        onChange={(event) =>
          dispatch({
            type: 'SET_FILTER',
            payload: { ...filter, lock: event.target.value },
          })
        }
      >
        <option value={0}>All Locks</option>
        {locks &&
          locks.map((lock) => (
            <option key={lock.id} value={lock.id}>
              {lock.nickname}
            </option>
          ))}
      </select>
      <br></br>
      <span>Brand - </span>
      <select
        value={filter.brand}
        onChange={(event) =>
          dispatch({
            type: 'SET_FILTER',
            payload: { ...filter, brand: event.target.value },
          })
        }
      >
        <option value={0}>All Brands</option>
        {brands &&
          brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.brand}
            </option>
          ))}
      </select>
      <span>Type - </span>
      <select
        value={filter.type}
        onChange={(event) =>
          dispatch({
            type: 'SET_FILTER',
            payload: { ...filter, type: event.target.value },
          })
        }
      >
        <option value={0}>All Types</option>
        {types &&
          types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.type}
            </option>
          ))}
      </select>
      <button onClick={handleFilter}>Filter</button>
      <button onClick={() => dispatch({ type: 'CLEAR_FILTER' })}>Reset</button>
      <table>
        <thead>
          <tr>
            <th>Lock</th>
            <th>Brand</th>
            <th>Type</th>
            <th>Solved</th>
            <th>Time</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pickings.map((picking) => (
            <tr key={picking.id}>
              <td>{picking.nickname}</td>
              <td>{picking.brand}</td>
              <td>{picking.type}</td>
              <td>{picking.success}</td>
              <td>{picking.time_taken}</td>
              <td>{picking.date}</td>
              <td>
                <button
                  onClick={() => {
                    history.push({ pathname: `/pickDetails/${picking.id}` });
                  }}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewHistory;
