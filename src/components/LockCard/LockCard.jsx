import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import image from '../../images/Abus_Lock.jpg';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  media: {
    height: 140,
  },
  actions: {
    display: 'flex',
    alignContent: 'flex-end',
    justifyContent: 'space-between',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

// this component renders an individual lock on the view locks page
function LockCard({ lock }) {
  const history = useHistory();
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          title={lock.nickname}
          titleTypographyProps={{ variant: 'h6' }}
          subheader={
            lock.brand + ' | ' + lock.type + ' | ' + lock.num_pins + ' pins'
          }
        />
        <CardActionArea
          onClick={() => {
            history.push({ pathname: `/lockDetails/${lock.id}` });
          }}
        >
          <CardMedia
            component="img"
            className={classes.media}
            title={lock.nickname}
            image={image}
          />
        </CardActionArea>

        <CardActions className={classes.actions}>
          {/* find if lock is picked or not and show icon */}

          <Button color="primary">History</Button>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>{lock.notes}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default LockCard;
