import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

// this view displays more robust information on a lock than is available on the view locks page
function PickingDetails() {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const picking = useSelector((store) => store.pickDetails);

  useEffect(() => {
    // where do I put these clear reducers? in client or in sagas?
    dispatch({ type: 'CLEAR_PICKING' });
    dispatch({ type: 'FETCH_PICKING_DETAILS', payload: page.id });
  }, []);

  const handleDelete = () => {
    // swal alert?
    // console.log('clicked delete for lock', page.id);
    // dispatch({ type: 'DELETE_LOCK', payload: page.id });
    // history.push('/viewLocks');
  };

  const routeBack = () => {
    dispatch({ type: 'CLEAR_PICKING' });
    history.push('/viewHistory');
  };

  return (
    <div>
      <p>Picking Event Details</p>
      {picking && (
        <div>
          <p>Picking event #{picking.id}</p>
          <p>Lock : {picking.nickname}</p>
          <p>Time Taken : {picking.time_taken}</p>
          <p>Date : {picking.date}</p>
          {/* success */}
          <p>Brand : {picking.brand}</p>
          <p>Type : {picking.type}</p>
          <p>Number of Pins : {picking.num_pins}</p>
          <p>Lock Notes : {picking.lock_notes}</p>
          {/* <button
            onClick={() => {
              history.push({ pathname: `/edit/${lock.id}` });
            }}
          >
            Edit
          </button> */}
          <button onClick={handleDelete}>Delete</button>
          <button onClick={routeBack}>Back</button>
        </div>
      )}
    </div>
  );
}

export default PickingDetails;
