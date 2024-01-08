const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


router.get('/items', (req, res) => {
    // console.log('im in basic route');

    const query = `
      SELECT * FROM "items";
    `;

    pool.query(query)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all items', err);
            res.sendStatus(500)
        })

});


router.get('/inventory', (req, res) => {
    // console.log('im in character get');
    const query = `
  SELECT "user_characters"."id" as "id",
		"user_characters"."user_id" as "user_id",
		"user_characters"."character_id",
        "user_characters"."starter",
        "user_characters"."new",
		"characters"."name",
		"characters"."profile_pic",
		"characters"."hp",
		"characters"."stamina",
		"characters"."unique_attack",
		"characters"."unique_damage",
		"characters"."unique_stamina",
        "characters"."battle_pic"
 FROM "user_characters"
	INNER JOIN "characters"
    	ON "user_characters"."character_id" = "characters"."id"
    WHERE "user_id" = ${[req.user.id]};
  `;

    pool.query(query)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all users inventory', err);
            res.sendStatus(500)
        })

});


router.put("/buy/:id", (req, res) => {

    const sqlText = `
    UPDATE "user_characters"
  SET "starter" = FALSE
    WHERE "user_id" = ${[req.user.id]};
      `;

    pool.query(sqlText)
        .then((result) => {

            const insertNewUserQuery = `
        UPDATE "user_characters"
          SET "starter" = TRUE
          WHERE "id" = ${req.params.id};
          `;

            pool.query(insertNewUserQuery)
                .then(result => {

                    res.sendStatus(201);
                })
        }).catch(err => {
            // catch for second query
            console.log('in the second', err);
            res.sendStatus(500)
        })
        .catch((err) => {
            console.log("Error in inventory.router /buy PUT,", err);
            res.sendStatus(500);
        });
});



module.exports = router;
