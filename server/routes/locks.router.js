const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/all', rejectUnauthenticated, (req, res) => {
  console.log('in get all locks');
  const queryText = `SELECT * FROM "locks";`;
  pool
    .query(queryText)
    .then((result) => {
      console.log('received all locks', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in fetch all locks', error);
      res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('in post lock, received', req.body);
  console.log('user is here', req.user);
  const queryText = `INSERT INTO "locks" ("nickname", "user_id", "brand_id", "type_id", "num_pins", "img_url", "notes")
      VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  pool
    .query(queryText, [
      req.body.nickname,
      req.user.id,
      req.body.brand_id,
      req.body.type_id,
      req.body.num_pins,
      req.body.img_url,
      req.body.notes,
    ])
    .then((result) => {
      console.log('added lock');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in post lock', error);
      res.sendStatus(500);
    });
});

module.exports = router;
