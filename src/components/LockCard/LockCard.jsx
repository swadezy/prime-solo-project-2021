import { useHistory } from 'react-router-dom';

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

// {"id":5,"nickname":"poopy","user_id":1,"brand_id":9,"type_id":1,"num_pins":1,"img_url":"no","notes":"u","brand":"Medeco","type":"pin-tumbler"}

export default LockCard;
