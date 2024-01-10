const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/character', (req, res) => {
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


router.get('/enemy/:id', (req, res) => {
    // console.log('im in enemy get');
    const query = `
    SELECT "levels"."id" as "level_id",
        "levels"."enemy_id" as "enemy_id",
        "levels"."name" as "level_name",
        "characters"."name",
        "characters"."profile_pic",
        "characters"."hp",
        "characters"."stamina",
        "characters"."unique_attack",
        "characters"."unique_damage",
        "characters"."unique_stamina",
        "characters"."battle_pic"
            FROM "levels"
        INNER JOIN "characters"
            ON "levels"."enemy_id" = "characters"."id"
        WHERE "levels"."id" = ${req.params.id};
      `;

    pool.query(query)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get the enemies', err);
            res.sendStatus(500)
        })

});


router.post('/', (req, res) => {

    // console.log('req.body', req.body);

    const insertCharacterQuery = `
          INSERT INTO "user_characters" 
            ("user_id", "character_id")
            VALUES
            (${[req.user.id]}, $1);
        `;
    const insertCharacterValue = [
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

router.put("/buy", (req, res) => {

    const sqlText = `
        UPDATE "user"
          SET "coins" = "coins" - 15
          WHERE "id" = ${[req.user.id]};
          `;

    pool
        .query(sqlText, insertValue)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log("Error in character.router PUT,", err);
            res.sendStatus(500);
        });
});


router.put("/sell/character", (req, res) => {

    const sqlText = `
        UPDATE "user"
          SET "coins" = "coins" + 10
          WHERE "id" = ${[req.user.id]};
          `;


    pool
        .query(sqlText, insertValue)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log("Error in character.router /sell PUT,", err);
            res.sendStatus(500);
        });
});


router.delete("/sell", (req, res) => {

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


router.get('/starter', (req, res) => {
    // console.log('im in character get', req.user.id);
    const query = `
    SELECT "user_characters"."id" as "id",
    "user_characters"."user_id" as "user_id",
    "user_characters"."character_id",
    "user_characters"."starter",
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
WHERE "user_characters"."starter" = TRUE AND "user_id" = ${[req.user.id]};

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


router.put("/starter/:id", (req, res) => {

    const sqlText = `
    UPDATE "user_characters"
  SET "starter" = FALSE
    WHERE "user_id" = ${[req.user.id]};
      `;




    pool.query(sqlText, insertValue)
        .then((result) => {

            const insertNewUserQuery = `
        UPDATE "user_characters"
          SET "starter" = TRUE
          WHERE "id" = $1;
          `;

          const sqlValues = [req.params.id]

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
            console.log("Error in character.router /sell PUT,", err);
            res.sendStatus(500);
        });
});

router.put("/new/:id", (req, res) => {

    const sqlText = `
    UPDATE "user_characters"
    SET "new" = FALSE
    WHERE "id" = $1;
          `;

      const insertValue = [req.params.id]


    pool
        .query(sqlText, insertValue)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log("Error in character.router /sell PUT,", err);
            res.sendStatus(500);
        });
});





module.exports = router;
