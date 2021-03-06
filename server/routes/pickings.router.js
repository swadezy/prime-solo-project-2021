const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

// gets filtered list of pickings with lock info, brand, and type from db - defaults to unfiltered
router.get('/all/:lock', rejectUnauthenticated, (req, res) => {
  console.log('received filter params', req.params);
  const queryText = `SELECT "pickings".*, "locks".nickname, "locks".num_pins, "brands".brand, "types".type FROM "pickings"
  JOIN "locks" ON "pickings".lock_id = "locks".id
  JOIN "brands" ON "locks".brand_id = "brands".id
  JOIN "types" ON "locks".type_id = "types".id
  WHERE "pickings".user_id = $1
  AND ("lock_id" = $2 OR $2 = 0)
  ORDER BY "pickings".date ASC`;
  pool
    .query(queryText, [
      req.user.id,
      req.params.lock,
    ])
    .then((result) => {
      console.log('received all pickings', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in fetch all pickings', error);
      res.sendStatus(500);
    });
});

// gets details for one picking event from db
router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in details get with picking id', req.params.id);
  const queryText = `SELECT "pickings".*, "locks".nickname, "locks".num_pins, "locks".notes AS "lock_notes", "brands".brand, "types".type FROM "pickings"
  JOIN "locks" ON "pickings".lock_id = "locks".id
  JOIN "brands" ON "locks".brand_id = "brands".id
  JOIN "types" ON "locks".type_id = "types".id
  WHERE "pickings".user_id = $1
  AND "pickings".id = $2;`;
  pool
    .query(queryText, [req.user.id, req.params.id])
    .then((result) => {
      console.log('received picking detail', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in fetch picking detail', error);
      res.sendStatus(500);
    });
});

// gets success status for all locks from db
router.get('/success', rejectUnauthenticated, (req, res) => {
  console.log('in success get');
  const queryText = `SELECT "pickings".*, "locks".nickname, "locks".num_pins, "locks".notes AS "lock_notes", "brands".brand, "types".type FROM "pickings"
  JOIN "locks" ON "pickings".lock_id = "locks".id
  JOIN "brands" ON "locks".brand_id = "brands".id
  JOIN "types" ON "locks".type_id = "types".id
  WHERE "pickings".user_id = $1
  AND "pickings".id = $2;`;
  pool
    .query(queryText, [req.user.id, req.params.id])
    .then((result) => {
      console.log('received picking detail', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in fetch picking detail', error);
      res.sendStatus(500);
    });
});

// adds picking event to db
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('in post picking, received', req.body);
  const queryText = `INSERT INTO "pickings" ("user_id", "lock_id", "success", "time_taken", "date", "notes")
      VALUES ($1, $2, $3, $4, $5, $6);`;
  pool
    .query(queryText, [
      req.user.id,
      req.body.lock_id,
      req.body.success,
      req.body.time_taken,
      req.body.date,
      req.body.notes,
    ])
    .then((result) => {
      console.log('added picking');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in post picking', error);
      res.sendStatus(500);
    });
});

// updates picking event in db
router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in picking put, received', req.body);
  const queryText = `UPDATE "pickings"
  SET "time_taken" = $2, "date" = $3, "notes" = $4
  WHERE "pickings".user_id = $1
  AND "id" = $5;`;
  pool
    .query(queryText, [
      req.user.id,
      req.body.time_taken,
      req.body.date,
      req.body.notes,
      req.body.id,
    ])
    .then((result) => {
      console.log('updated picking');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in update lock', error);
      res.sendStatus(500);
    });
});

// deletes picking event from db
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in delete for picking id', req.params.id);
  const queryText = `DELETE FROM "pickings" WHERE "pickings".user_id = $1 AND "id" = $2;`;
  pool
    .query(queryText, [req.user.id, req.params.id])
    .then((result) => {
      console.log('deleted picking event');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in delete picking', error);
      res.sendStatus(500);
    });
});

module.exports = router;
