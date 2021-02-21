import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import abus from '../../images/Abus_Lock.jpg';
import american from '../../images/American_Lock.jpg';
import brinks from '../../images/Brinks_Lock.jpg';
import commando from '../../images/Commando_Lock.jpg';
import kwikset from '../../images/Kwikset_Lock.jpg';
import master from '../../images/Master_Lock.jpg';
import other from '../../images/Other_Lock.jpg';
import sargent from '../../images/Sargent_Lock.jpg';
import schlage from '../../images/Schlage_Lock.jpg';
import trubolt from '../../images/Tru-Bolt_Lock.jpg';
import weiser from '../../images/Weiser_Lock.jpg';
import yale from '../../images/Yale_Lock.jpg';

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
  Tooltip,
  IconButton,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import TimelineIcon from '@material-ui/icons/Timeline';
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
    height: 180,
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
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleRouteHistory = () => {
    dispatch({ type: 'CLEAR_PICKINGS' });
    dispatch({
      type: 'SET_FILTER',
      payload: lock.id,
    });
    history.push('/viewHistory');
  };

  const HandleImage = ({ brand }) => {
    switch (brand) {
      case 'Abus':
        return (
          <CardMedia
            component="img"
            className={classes.media}
            title={lock.nickname}
            image={abus}
          />
        );
      case 'American':
        return (
          <CardMedia
            component="img"
            className={classes.media}
            title={lock.nickname}
            image={american}
          />
        );
      case 'Brinks':
        return (
          <CardMedia
            component="img"
            className={classes.media}
            title={lock.nickname}
            image={brinks}
          />
        );
      case 'Commando':
        return (
          <CardMedia
            component="img"
            className={classes.media}
            title={lock.nickname}
            image={commando}
          />
        );
      case 'Kwikset':
        return (
          <CardMedia
            component="img"
            className={classes.media}
            title={lock.nickname}
            image={kwikset}
          />
        );
      case 'Master':
        return (
          <CardMedia
            component="img"
            className={classes.media}
            title={lock.nickname}
            image={master}
          />
        );
      case 'Other':
        return (
          <CardMedia
            component="img"
            className={classes.media}
            title={lock.nickname}
            image={other}
          />
        );
      case 'Sargent':
        return (
          <CardMedia
            component="img"
            className={classes.media}
            title={lock.nickname}
            image={sargent}
          />
        );
      case 'Schlage':
        return (
          <CardMedia
            component="img"
            className={classes.media}
            title={lock.nickname}
            image={schlage}
          />
        );
      case 'Tru-Bolt':
        return (
          <CardMedia
            component="img"
            className={classes.media}
            title={lock.nickname}
            image={trubolt}
          />
        );
      case 'Weiser':
        return (
          <CardMedia
            component="img"
            className={classes.media}
            title={lock.nickname}
            image={weiser}
          />
        );
      case 'Yale':
        return (
          <CardMedia
            component="img"
            className={classes.media}
            title={lock.nickname}
            image={yale}
          />
        );
      default:
        return (
          <CardMedia
            component="img"
            className={classes.media}
            title={lock.nickname}
            image={other}
          />
        );
    }
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
          style={{ position: 'relative' }}
          onClick={handleExpandClick}
        >
          <HandleImage brand={lock.brand} />
          {/* <CardMedia
            component="img"
            className={classes.media}
            title={lock.nickname}
            image={lock.brand == 'Master' ? master : other}
          /> */}
          {
            <LockIcon
              style={{ position: 'absolute', top: '15px', right: '15px' }}
            />
          }
        </CardActionArea>
        <CardActions className={classes.actions}>
          {/* find if lock is picked or not and show icon */}
          <Button
            startIcon={<TimelineIcon />}
            color="primary"
            onClick={handleRouteHistory}
          >
            History
          </Button>
          <Button
            startIcon={<EditIcon />}
            color="secondary"
            onClick={() => {
              // put clear lock here to clean up rendering?
              history.push({ pathname: `/lockEdit/${lock.id}` });
            }}
          >
            Edit
          </Button>
          <Tooltip title="Expand">
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
          </Tooltip>
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
