const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "users" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// gets full list of users from db
router.get('/all', (req, res) => {
  console.log('in get users');
  const queryText = (req.user.admin && `SELECT * FROM "users" ORDER BY "id" ASC;`);
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in fetch users', error);
      res.sendStatus(500);
    });
});

// deletes user from db
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in delete for user id', req.params.id);
  console.log(req.user.admin);
  const queryText = req.user.admin
    ? `DELETE FROM "users" WHERE "users".id = $1;`
    : null;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      console.log('deleted user');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in delete user', error);
      res.sendStatus(500);
    });
});

module.exports = router;
