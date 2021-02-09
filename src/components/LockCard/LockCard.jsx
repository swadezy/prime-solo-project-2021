import { useHistory } from 'react-router-dom';

// this component renders an individual lock on the view locks page
function LockCard({ lock }) {
  const history = useHistory();

  return (
    <div>
      <p>Nickname : {lock.nickname}</p>
      {lock.img_url ? <p>there is an image</p> : <p>no image</p>}
      <button
        onClick={() => {
          history.push({ pathname: `/details/${lock.id}` });
        }}
      >
        Details
      </button>
      <button>History</button>
    </div>
  );
}

export default LockCard;
