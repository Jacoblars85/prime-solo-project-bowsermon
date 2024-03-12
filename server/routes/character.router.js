const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/character', (req, res) => {
    // console.log('im in character get');
    const query = `
    SELECT "user_characters"."id" as "id",
    "user_characters"."user_id" as "user_id",
    "user_characters"."character_id",
    "user_characters"."starter_1",
    "user_characters"."starter_2",
    "user_characters"."new",
    "characters"."name",
    "characters"."profile_pic",
    "characters"."hp",
    "characters"."stamina",
    "characters"."speed",
    "characters"."unique_attack",
    "characters"."unique_damage",
    "characters"."unique_stamina",
    "characters"."battle_pic",
    "items"."name" as "item_name",
    "items"."hp" as "item_hp",
    "items"."stamina" as "item_stamina",
    "items"."pic" as "item_pic",
    "items"."type" as "item_type",
    "items"."speed" as "item_speed",
    "items"."attack" as "item_attack",
    "items"."cost" as "item_cost",
    "items"."color" as "item_color"
FROM "user_characters" 
INNER JOIN "characters"
    ON "user_characters"."character_id" = "characters"."id"
INNER JOIN "items"
    ON "user_characters"."item" = "items"."id"
WHERE "user_id" = $1
ORDER BY "character_id", "id" DESC;
  `;

  const sqlValues = [req.user.id];

    pool.query(query, sqlValues)
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
        "characters"."speed",
        "characters"."unique_attack",
        "characters"."unique_damage",
        "characters"."unique_stamina",
        "characters"."battle_pic"
            FROM "levels"
        INNER JOIN "characters"
            ON "levels"."enemy_id" = "characters"."id"
        WHERE "levels"."id" = $1;
      `;

      const sqlValues = [req.params.id];

    pool.query(query, sqlValues)
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
            ($1, $2);
        `;
    const insertCharacterValue = [req.user.id, req.body.characterID]

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
          WHERE "id" = $1;
          `;

          const sqlValues = [req.user.id];

    pool
        .query(sqlText, sqlValues)
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
          WHERE "id" = $1;
          `;

          const sqlValues = [req.user.id];

    pool
        .query(sqlText, sqlValues)
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
      WHERE "id" = $1;
      `

      const sqlValues = [req.body.characterID];

    pool
        .query(sqlText, sqlValues)
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
    "user_characters"."starter_1",
    "user_characters"."starter_2",
    "characters"."name",
    "characters"."profile_pic",
    "characters"."hp",
    "characters"."stamina",
    "characters"."speed",
    "characters"."unique_attack",
    "characters"."unique_damage",
    "characters"."unique_stamina",
    "characters"."battle_pic"
FROM "user_characters"
INNER JOIN "characters"
    ON "user_characters"."character_id" = "characters"."id"
WHERE "user_characters"."starter_1" = TRUE AND "user_id" = $1 OR "user_characters"."starter_2" = TRUE AND "user_id" = $1
    ORDER BY "starter_1" DESC;
  `;

  const sqlValues = [req.user.id];

    pool.query(query, sqlValues)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all characters', err);
            res.sendStatus(500)
        })

});


router.put("/starter/one/:id", (req, res) => {

    const sqlText = `
    UPDATE "user_characters"
  SET "starter_1" = FALSE
    WHERE "user_id" = $1;
      `;

      const sqlValues = [req.user.id];

    pool.query(sqlText, sqlValues)
        .then((result) => {

            const insertNewUserQuery = `
        UPDATE "user_characters"
          SET "starter_1" = TRUE
          WHERE "id" = $1 AND "user_id" = $2;
          `;

            const sqlValues = [req.params.id, req.user.id]

            pool.query(insertNewUserQuery, sqlValues)
                .then(result => {
                    res.sendStatus(201);
                })
        }).catch(err => {
            // catch for second query
            console.log('in the second', err);
            res.sendStatus(500)
        })
        .catch((err) => {
            console.log("Error in character.router /startrer 1 PUT,", err);
            res.sendStatus(500);
        });
});


router.put("/starter/two/:id", (req, res) => {

    const sqlText = `
    UPDATE "user_characters"
  SET "starter_2" = FALSE
    WHERE "user_id" = $1;
      `;

      const sqlValues = [req.user.id];

    pool.query(sqlText, sqlValues)
        .then((result) => {

            const insertNewUserQuery = `
        UPDATE "user_characters"
          SET "starter_2" = TRUE
          WHERE "id" = $1 AND "user_id" = $2;
          `;

            const sqlValues = [req.params.id, req.user.id]

            pool.query(insertNewUserQuery, sqlValues)
                .then(result => {
                    res.sendStatus(201);
                })
        }).catch(err => {
            // catch for second query
            console.log('in the second', err);
            res.sendStatus(500)
        })
        .catch((err) => {
            console.log("Error in character.router /starter 2 PUT,", err);
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
            console.log("Error in character.router /new PUT,", err);
            res.sendStatus(500);
        });
});

router.put("/starter/clear/:id", (req, res) => {
    // console.log(req.params.id);
    const sqlText = `
    UPDATE "user_characters"
        SET "starter_1" = FALSE 
            WHERE "id" = $1 AND "user_id" = $2;
    `;

    const sqlValues = [req.params.id, req.user.id]

    pool.query(sqlText, sqlValues)
        .then(result => {

            console.log(req.params.id);

            const sqlText = `
    UPDATE "user_characters"
        SET "starter_2" = FALSE
            WHERE "id" = $1 AND "user_id" = $2;
    `;

    const sqlValues = [req.params.id, req.user.id]

            pool.query(sqlText, sqlValues)
                .then(result => {
                    res.sendStatus(201);
                })
        }).catch(err => {
            console.log("Error in 2nd character.router /clear PUT,", err);
            res.sendStatus(500);
        })
        .catch((err) => {
            console.log("Error in character.router /clear PUT,", err);
            res.sendStatus(500);
        });
});


router.put("/starter/conditional/:id", (req, res) => {
//  console.log('req.body', req.body);

    const sqlText = `
    UPDATE "user_characters"
       SET "starter_${req.body.otherStarter}" = FALSE
         WHERE "id" = $1 AND "user_id" = $2;
      `;

      const sqlValues = [req.params.id, req.user.id]

    pool.query(sqlText, sqlValues)
        .then((result) => {

            const insertNewUserQuery = `
        UPDATE "user_characters"
          SET "starter_${req.body.currentStarter}" = FALSE
          WHERE "user_id" = $1;
          `;

      const sqlValues = [req.user.id]

            pool.query(insertNewUserQuery, sqlValues)
            .then((result) => {

                const insertNewUserQuery = `
            UPDATE "user_characters"
              SET "starter_${req.body.currentStarter}" = TRUE
              WHERE "id" = $1 AND "user_id" = $2;
              `;
    
                const sqlValues = [req.params.id, req.user.id]
    
                pool.query(insertNewUserQuery, sqlValues)
                .then(result => {
                    res.sendStatus(201);
                })
            }).catch(err => {
                // catch for second query
                console.log('in the third', err);
                res.sendStatus(500)
            })
        }).catch(err => {
            // catch for second query
            console.log('in the second', err);
            res.sendStatus(500)
        })
        .catch((err) => {
            console.log("Error in character.router /starter conditionally PUT,", err);
            res.sendStatus(500);
        });
});




module.exports = router;
