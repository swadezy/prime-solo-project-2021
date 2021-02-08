const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/all', rejectUnauthenticated, (req, res) => {
  console.log('in get all locks');
  const queryText = `SELECT "locks".*, "brands".brand, "types".type FROM "locks"
  JOIN "brands" ON "locks".brand_id = "brands".id
  JOIN "types" ON "locks".type_id = "types".id
  ORDER BY "id" ASC;`;
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

router.get('/:id', (req, res) => {
  console.log('in details get with id', req.params.id);
  const queryText = `SELECT "locks".*, "brands".brand, "types".type FROM "locks"
    JOIN "brands" ON "locks".brand_id = "brands".id
    JOIN "types" ON "locks".type_id = "types".id
    WHERE "locks".id = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      console.log('received lock detail', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in fetch lock detail', error);
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

router.put('/:id', (req, res) => {
  console.log('in put, received', req.body);
  console.log('user is here', req.user);
  const queryText = `UPDATE "locks"
  SET "nickname" = $1, "brand_id" = $2, "type_id" = $3, "num_pins" = $4, "img_url" = $5, "notes" = $6
  WHERE "id" = $7;`;
  pool
    .query(queryText, [
      req.body.nickname,
      req.body.brand_id,
      req.body.type_id,
      req.body.num_pins,
      req.body.img_url,
      req.body.notes,
      req.body.id,
    ])
    .then((result) => {
      console.log('updated lock');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in update lock', error);
      res.sendStatus(500);
    });
});

module.exports = router;
