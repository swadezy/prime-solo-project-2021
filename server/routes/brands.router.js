const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

// gets full list of brands from db
router.get('/', (req, res) => {
  console.log('in get brands');
  const queryText = `SELECT * FROM "brands" ORDER BY "id" ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in fetch brands', error);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {});

// updates brands in db
router.put('/', rejectUnauthenticated, (req, res) => {
  console.log('in brands put, received', req.body);
  req.user.admin &&
    req?.body?.map((brand) => {
      const queryText = `UPDATE "brands"
  SET "brand" = $1
  WHERE "id" = $2;`;
      pool
        .query(queryText, [brand.brand, brand.id])
        .then((result) => {
          console.log('updated brands');
          // res.sendStatus(200);
        })
        .catch((error) => {
          console.log('error in update brands', error);
          res.sendStatus(500);
        });
    }).then(() => {
      res.sendStatus(200);
    })
});

// deletes brand from db
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in delete for brand id', req.params.id);
  const queryText = req.user.admin
    ? `DELETE FROM "brands" WHERE "brands".id = $1;`
    : null;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      console.log('deleted brand');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in delete brand', error);
      res.sendStatus(500);
    });
});

module.exports = router;
