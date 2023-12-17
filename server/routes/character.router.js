const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/character/:id', (req, res) => {
console.log('im in character get');
  const query = `
  SELECT * FROM "user_characters"
  INNER JOIN "characters"
      ON "user_characters"."character_id" = "characters"."id"
  WHERE "user_id" = ${req.params.id};
  `;

  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all characters', err);
      res.sendStatus(500)
    })

});


router.get('/basic', (req, res) => {
console.log('im in basic route');
    const query = `
      SELECT * FROM "basic_attacks";
    `;
  
    pool.query(query)
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all basic attacks', err);
        res.sendStatus(500)
      })
  
  });


  router.get('/enemy', (req, res) => {
    console.log('im in enemy get');
      const query = `
      SELECT * FROM "levels"
      INNER JOIN "characters"
          ON "levels"."enemy_id" = "characters"."id"
      WHERE "levels"."id" = 1;
      `;
    
      pool.query(query)
        .then(result => {
          res.send(result.rows);
        })
        .catch(err => {
          console.log('ERROR: Get all enemies', err);
          res.sendStatus(500)
        })
    
    });
  



module.exports = router;
