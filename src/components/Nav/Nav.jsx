import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

// look into this margin / flex stuff
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            className={classes.title}
            component={Link}
            style={{ textDecoration: 'none' }}
            to={'/home'}
            color="inherit"
          >
            PickLogger
          </Typography>
          <Button component={Link} to={loginLinkData.path} color="inherit">
            {loginLinkData.text}
          </Button>

          {user.id && (
            <div>
              <Button component={Link} to="/addLock" color="inherit">
                Add Lock
              </Button>
              <Button component={Link} to="/viewLocks" color="inherit">
                View Locks
              </Button>
              <Button component={Link} to="/addPicking" color="inherit">
                Add Picking
              </Button>
              <Button
                component={Link}
                to="/viewHistory"
                onClick={() => dispatch({ type: 'CLEAR_FILTER' })}
                color="inherit"
              >
                View History
              </Button>
            </div>
          )}
          {user.admin && (
            <Button component={Link} to="/admin" color="inherit">
              Admin
            </Button>
          )}
          <Button component={Link} to="/about" color="inherit">
            About
          </Button>
          {user.id && <LogOutButton />}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
