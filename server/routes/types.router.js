const express = require('express');
const pool = require('../modules/pool');
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

router.post('/', (req, res) => {
  
});

module.exports = router;
