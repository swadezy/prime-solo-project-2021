import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Admin() {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.users);
  const brands = useSelector((store) => store.brands);
  const types = useSelector((store) => store.types);

  useEffect(() => {
    dispatch({ type: 'FETCH_USERS' });
    dispatch({ type: 'FETCH_BRANDS' });
    dispatch({ type: 'FETCH_TYPES' });
  }, []);

  return (
    <div>
      <p>Admin</p>
      <p>Users -</p>
      {users && users.map((user) => <p>{user.username}</p>)}
      <br></br>
      <p>Brands -</p>
      {brands && brands.map((brand) => <p>{brand.brand}</p>)}
      <br></br>
      <p>Types -</p>
      {types && types.map((type) => <p>{type.type}</p>)}
    </div>
  );
}

export default Admin;
