import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function LockEdit() {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const lock = useSelector((store) => store.locks)[0];
  const brands = useSelector((store) => store.brands);
  const types = useSelector((store) => store.types);
  const [lockEdit, setLockEdit] = useState({
    id: lock.id,
    nickname: lock.nickname,
    brand_id: lock.brand_id,
    type_id: lock.type_id,
    num_pins: lock.num_pins,
    img_url: lock.img_url,
    notes: lock.notes,
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_LOCK_DETAIL', payload: page.id });
    dispatch({ type: 'FETCH_BRANDS' });
    dispatch({ type: 'FETCH_TYPES' });
  }, []);

  const handleEdit = (event) => {
    event.preventDefault();
    dispatch({ type: 'UPDATE_LOCK', payload: lockEdit });
    history.push({ pathname: `/details/${lock.id}` })
  };

  return (
    <div>
      <p>Lock Edit</p>
      <form onSubmit={handleEdit}>
        <span>Nickname -</span>
        <input
          value={lockEdit.nickname}
          onChange={(event) =>
            setLockEdit({ ...lockEdit, nickname: event.target.value })
          }
        />
        <br></br>

        <span>Brand -</span>
        <select
          value={lockEdit.brand_id}
          onChange={(event) =>
            setLockEdit({ ...lockEdit, brand_id: event.target.value })
          }
        >
          {brands &&
            brands.map((brand) => (
              <option value={brand.id}>{brand.brand}</option>
            ))}
        </select>

        <br></br>
        <span>Type -</span>
        <select
          value={lockEdit.type_id}
          onChange={(event) =>
            setLockEdit({ ...lockEdit, type_id: event.target.value })
          }
        >
          {types &&
            types.map((type) => <option value={type.id}>{type.type}</option>)}
        </select>

        <br></br>
        <span>Number of Pins -</span>
        <input
          value={lockEdit.num_pins}
          onChange={(event) =>
            setLockEdit({ ...lockEdit, num_pins: event.target.value })
          }
        />
        <br></br>
        <span>Image -</span>
        <input
          value={lockEdit.img_url}
          onChange={(event) =>
            setLockEdit({ ...lockEdit, img_url: event.target.value })
          }
        />
        <br></br>
        <span>Notes -</span>
        <input
          value={lockEdit.notes}
          onChange={(event) =>
            setLockEdit({ ...lockEdit, notes: event.target.value })
          }
        />
        <br></br>
        <button type="submit">Submit</button>
        <button
          onClick={() => {
            history.push({ pathname: `/details/${lock.id}` });
          }}
        >
          Back
        </button>
      </form>
    </div>
  );
}

export default LockEdit;
