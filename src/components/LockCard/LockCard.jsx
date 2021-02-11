import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  actions: {
    display: 'flex',
    alignContent: 'flex-end',
    justifyContent: 'space-between',
  },
});

// this component renders an individual lock on the view locks page
function LockCard({ lock }) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea
          onClick={() => {
            history.push({ pathname: `/lockDetails/${lock.id}` });
          }}
        >
          <CardMedia className={classes.media} title={lock.nickname} />
          <CardContent>
            <Typography gutterBottom variant="h6">
              {lock.nickname}
            </Typography>
            <Typography variant="body2">{lock.notes}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actions}>
          <Button
            color="primary"
            onClick={() => {
              history.push({ pathname: `/lockDetails/${lock.id}` });
            }}
          >
            Details
          </Button>
          <Button color="primary">History</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default LockCard;
