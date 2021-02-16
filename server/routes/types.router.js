const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

// gets full list of types from db
router.get('/', (req, res) => {
  console.log('in get types');
  const queryText = `SELECT * FROM "types" ORDER BY "id" ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in fetch all types', error);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {});

// deletes type from db
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in delete for type id', req.params.id);
  console.log(req.user.admin);
  const queryText = req.user.admin
    ? `DELETE FROM "types" WHERE "types".id = $1;`
    : null;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      console.log('deleted type');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in delete type', error);
      res.sendStatus(500);
    });
});

module.exports = router;
