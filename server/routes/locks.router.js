const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/all', (req, res) => {
  console.log('in get');
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
