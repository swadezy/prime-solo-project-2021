import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AddLock() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newLock, setNewLock] = useState({
    nickname: '',
    brand_id: 0,
    type_id: 0,
    num_pins: 0,
    img_url: '',
    notes: '',
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_BRANDS' });
    dispatch({ type: 'FETCH_TYPES' });
  }, []);

  const brands = useSelector((store) => store.brands);
  const types = useSelector((store) => store.types);

  const handleAdd = (event) => {
    event.preventDefault();
    console.log(newLock);
    if (newLock.nickname) {
      dispatch({ type: 'POST_LOCK', payload: newLock });
      // need to get select clear working
      setNewLock({
        nickname: '',
        brand_id: 0,
        type_id: 0,
        num_pins: '',
        img_url: '',
        notes: '',
      });
    } else {
      console.log('complete all fields');
    }
  };

  return (
    <div>
      <p>AddLock</p>

      <form onSubmit={handleAdd}>
        <span>Nickname :</span>
        <input
          value={newLock.nickname}
          onChange={(event) =>
            setNewLock({ ...newLock, nickname: event.target.value })
          }
        />
        <br></br>

        <span>Brand :</span>
        <select
          value={newLock.brand_id}
          onChange={(event) =>
            setNewLock({ ...newLock, brand_id: event.target.value })
          }
        >
          <option value={0}>...select brand</option>
          {brands &&
            brands.map((brand) => (
              <option value={brand.id}>{brand.brand}</option>
            ))}
        </select>
        <br></br>

        <span>Type :</span>
        <select
          value={newLock.type_id}
          onChange={(event) =>
            setNewLock({ ...newLock, type_id: event.target.value })
          }
        >
          <option value={0}>...select type</option>
          {types &&
            types.map((type) => <option value={type.id}>{type.type}</option>)}
        </select>
        <br></br>

        <span>Number of Pins :</span>
        <input
          value={newLock.num_pins}
          onChange={(event) =>
            setNewLock({ ...newLock, num_pins: event.target.value })
          }
        />
        <br></br>

        <span>Image Upload :</span>
        <input
          value={newLock.img_url}
          onChange={(event) =>
            setNewLock({ ...newLock, img_url: event.target.value })
          }
        />
        <br></br>

        <span>Notes :</span>
        <input
          value={newLock.notes}
          onChange={(event) =>
            setNewLock({ ...newLock, notes: event.target.value })
          }
        />
        <br></br>
        <button type="submit">Submit</button>
        <button
          onClick={() => {
            history.push('/');
          }}
        >
          Back
        </button>
      </form>
    </div>
  );
}

export default AddLock;
