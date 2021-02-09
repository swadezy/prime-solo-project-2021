const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

// gets full list of locks with brand and type from db
router.get('/all', rejectUnauthenticated, (req, res) => {
  console.log('in get all locks');
  const queryText = `SELECT "locks".*, "brands".brand, "types".type FROM "locks"
  JOIN "brands" ON "locks".brand_id = "brands".id
  JOIN "types" ON "locks".type_id = "types".id
  WHERE "locks".user_id = $1
  ORDER BY "id" ASC;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      console.log('received all locks', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in fetch all locks', error);
      res.sendStatus(500);
    });
});

// gets details for one lock from db
router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in details get with lock id', req.params.id);
  const queryText = `SELECT "locks".*, "brands".brand, "types".type FROM "locks"
    JOIN "brands" ON "locks".brand_id = "brands".id
    JOIN "types" ON "locks".type_id = "types".id
    WHERE "locks".user_id = $1
    AND "locks".id = $2;`;
  pool
    .query(queryText, [req.user.id, req.params.id])
    .then((result) => {
      console.log('received lock detail', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in fetch lock detail', error);
      res.sendStatus(500);
    });
});

// adds lock to db
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('in post lock, received', req.body);
  const queryText = `INSERT INTO "locks" ("user_id", "nickname", "brand_id", "type_id", "num_pins", "img_url", "notes")
      VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  pool
    .query(queryText, [
      req.user.id,
      req.body.nickname,
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

// updates lock in db
router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in lock put, received', req.body);
  const queryText = `UPDATE "locks"
  SET "nickname" = $2, "brand_id" = $3, "type_id" = $4, "num_pins" = $5, "img_url" = $6, "notes" = $7
  WHERE "locks".user_id = $1
  AND "id" = $8;`;
  pool
    .query(queryText, [
      req.user.id,
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

// deletes lock from db
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in delete for lock id', req.params.id);
  const queryText = `DELETE FROM "locks" WHERE "locks".user_id = $1 AND "id" = $2;`;
  pool
    .query(queryText, [req.user.id, req.params.id])
    .then((result) => {
      console.log('deleted lock');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in delete lock', error);
      res.sendStatus(500);
    });
});

module.exports = router;
