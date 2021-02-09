const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

// gets filtered list of pickings with lock info, brand, and type from db - defaults to unfiltered
router.get('/:lock/:brand/:type', rejectUnauthenticated, (req, res) => {
  console.log('received filter params', req.params);
  const queryText = `SELECT "pickings".*, "locks".nickname, "locks".num_pins, "brands".brand, "types".type FROM "pickings"
  JOIN "locks" ON "pickings".lock_id = "locks".id
  JOIN "brands" ON "locks".brand_id = "brands".id
  JOIN "types" ON "locks".type_id = "types".id
  WHERE ("lock_id" = $1 OR $1 = 0)
  AND ("brands".id = $2 OR $2 = 0)
  AND ("types".id = $3 OR $3 = 0)
  ORDER BY "pickings".date ASC;`;
  pool
    .query(queryText, [req.params.lock, req.params.brand, req.params.type])
    .then((result) => {
      console.log('received all pickings', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in fetch all pickings', error);
      res.sendStatus(500);
    });
});

// gets details for one lock from db
// router.get('/:id', rejectUnauthenticated, (req, res) => {
//   console.log('in details get with lock id', req.params.id);
//   const queryText = `SELECT "locks".*, "brands".brand, "types".type FROM "locks"
//     JOIN "brands" ON "locks".brand_id = "brands".id
//     JOIN "types" ON "locks".type_id = "types".id
//     WHERE "locks".id = $1;`;
//   pool
//     .query(queryText, [req.params.id])
//     .then((result) => {
//       console.log('received lock detail', result.rows);
//       res.send(result.rows);
//     })
//     .catch((error) => {
//       console.log('error in fetch lock detail', error);
//       res.sendStatus(500);
//     });
// });

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

// updates lock in db
// router.put('/:id', rejectUnauthenticated, (req, res) => {
//   console.log('in put, received', req.body);
//   const queryText = `UPDATE "locks"
//   SET "nickname" = $1, "brand_id" = $2, "type_id" = $3, "num_pins" = $4, "img_url" = $5, "notes" = $6
//   WHERE "id" = $7;`;
//   pool
//     .query(queryText, [
//       req.body.nickname,
//       req.body.brand_id,
//       req.body.type_id,
//       req.body.num_pins,
//       req.body.img_url,
//       req.body.notes,
//       req.body.id,
//     ])
//     .then((result) => {
//       console.log('updated lock');
//       res.sendStatus(200);
//     })
//     .catch((error) => {
//       console.log('error in update lock', error);
//       res.sendStatus(500);
//     });
// });

// deletes lock from db
// router.delete('/:id', rejectUnauthenticated, (req, res) => {
//   console.log('in delete for id', req.params.id);
//   const queryText = `DELETE FROM "locks" WHERE "id" = $1;`;
//   pool
//     .query(queryText, [req.params.id])
//     .then((result) => {
//       console.log('deleted lock');
//       res.sendStatus(200);
//     })
//     .catch((error) => {
//       console.log('error in delete lock', error);
//       res.sendStatus(500);
//     });
// });

module.exports = router;
