import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

// this component allows the user to edit lock information for each lock in their account
function LockEdit() {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const lock = useSelector((store) => store.lockDetails);
  const brands = useSelector((store) => store.brands);
  const types = useSelector((store) => store.types);

  useEffect(() => {
    dispatch({ type: 'FETCH_LOCK_DETAILS', payload: page.id });
    dispatch({ type: 'FETCH_BRANDS' });
    dispatch({ type: 'FETCH_TYPES' });
  }, []);

  const handleEdit = (event) => {
    event.preventDefault();
    dispatch({ type: 'UPDATE_LOCK', payload: lock });
    history.push({ pathname: `/details/${lock.id}` });
  };

  const routeBack = () => {
    // where do I put these clear reducers? in client or in sagas?
    dispatch({ type: 'CLEAR_LOCK' });
    history.push({ pathname: `/details/${lock.id}` });
  };

  return (
    <div>
      <p>Lock Edit</p>
      {lock && (
        <form onSubmit={handleEdit}>
          <span>Nickname -</span>
          <input
            value={lock.nickname}
            onChange={(event) =>
              dispatch({
                type: 'SET_LOCK',
                payload: { ...lock, nickname: event.target.value },
              })
            }
          />
          <br></br>

          <span>Brand - </span>
          <select
            value={lock.brand_id}
            onChange={(event) =>
              dispatch({
                type: 'SET_LOCK',
                payload: { ...lock, brand_id: event.target.value },
              })
            }
          >
            {brands &&
              brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.brand}
                </option>
              ))}
          </select>

          <br></br>
          <span>Type - </span>
          <select
            value={lock.type_id}
            onChange={(event) =>
              dispatch({
                type: 'SET_LOCK',
                payload: { ...lock, type_id: event.target.value },
              })
            }
          >
            {types &&
              types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.type}
                </option>
              ))}
          </select>

          <br></br>
          <span>Number of Pins -</span>
          <input
            value={lock.num_pins}
            onChange={(event) =>
              dispatch({
                type: 'SET_LOCK',
                payload: { ...lock, num_pins: event.target.value },
              })
            }
          />
          <br></br>
          <span>Image -</span>
          <input
            value={lock.img_url}
            onChange={(event) =>
              dispatch({
                type: 'SET_LOCK',
                payload: { ...lock, img_url: event.target.value },
              })
            }
          />
          <br></br>
          <span>Notes -</span>
          <input
            value={lock.notes}
            onChange={(event) =>
              dispatch({
                type: 'SET_LOCK',
                payload: { ...lock, notes: event.target.value },
              })
            }
          />
          <br></br>
          <button type="submit">Submit</button>
          <button onClick={routeBack}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default LockEdit;
