const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/character', (req, res) => {
    // console.log('im in character get');
    const query = `
  SELECT "user_characters"."id" as "id",
		"user_characters"."user_id" as "user_id",
		"user_characters"."character_id",
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
            console.log('ERROR: Get all characters', err);
            res.sendStatus(500)
        })

});


router.get('/basic', (req, res) => {
    // console.log('im in basic route');

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
    // console.log('im in enemy get');
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


router.post('/', (req, res) => {

    // console.log('req.body', req.body);

    const insertCharacterQuery = `
          INSERT INTO "user_characters" 
            ("user_id", "character_id")
            VALUES
            ($1, $2);
        `;
    const insertCharacterValue = [
        req.body.userID,
        req.body.characterID
    ]

    pool.query(insertCharacterQuery, insertCharacterValue)
        .then(result => {
            res.sendStatus(201);
        }).catch(err => {
            console.log('err in post route', err);
            res.sendStatus(500)
        })
})

router.put("/:id", (req, res) => {

    const sqlText = `
        UPDATE "user"
          SET "coins" = "coins" - 15
          WHERE "id" = '${req.params.id}';
          `;


    pool
        .query(sqlText)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log("Error in character.router PUT,", err);
            res.sendStatus(500);
        });
});


router.put("/sell/:id", (req, res) => {

    const sqlText = `
        UPDATE "user"
          SET "coins" = "coins" + 10
          WHERE "id" = '${req.params.id}';
          `;

    pool
        .query(sqlText)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log("Error in character.router /sell PUT,", err);
            res.sendStatus(500);
        });
});


router.delete("/sell/:id", (req, res) => {

    const sqlText = `
    DELETE FROM "user_characters"
      WHERE "id" = ${req.body.characterID};
      `

    pool
        .query(sqlText)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log("Error in user.router DELETE, deleting account", err);
            res.sendStatus(500);
        });
});





module.exports = router;
