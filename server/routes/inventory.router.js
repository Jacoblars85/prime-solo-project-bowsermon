const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


router.get('/consumable', (req, res) => {

    const query = `
    SELECT "id",
 		"name",
 		"type",
        "hp",
        "stamina",
        "speed",
        "pic",
        "cost",
        "color"
    FROM "items"
        WHERE "type" = 'consumable';
  `;

    pool.query(query)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all consumable items', err);
            res.sendStatus(500)
        })
});

router.get('/held', (req, res) => {

    const query = `
    SELECT "id",
 		"name",
 		"type",
        "hp",
        "stamina",
        "speed",
        "pic",
        "cost",
        "color"
    FROM "items"
        WHERE "type" = 'held';
  `;

    pool.query(query)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all held items', err);
            res.sendStatus(500)
        })
});


router.get('/inventory', (req, res) => {

    const query = `
    SELECT "user_inventory"."id" as "id",
            "user_inventory"."user_id" as "user_id",
            "user_inventory"."items_id" as "items_id",
            "user_inventory"."number" as "number",
            "items"."name",
            "items"."hp",
            "items"."stamina",
            "items"."pic"
    FROM "user_inventory"
        INNER JOIN "items"
    ON "user_inventory"."items_id" = "items"."id"
        WHERE "user_id" = $1
        ORDER BY "items_id" ASC;
  `;

  const sqlValues = [req.user.id];

    pool.query(query, sqlValues)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all users inventory', err);
            res.sendStatus(500)
        })
});


router.put("/buy/item/:id", (req, res) => {
    // console.log(req.body.amountNum);
    const sqlText = `
    UPDATE "user_inventory"
    SET "number" = "number" + $1
      WHERE "user_id" = $2 AND "items_id" = $3;
      `;

    const insertValue = [req.body.amountNum, req.user.id, req.params.id]


    pool.query(sqlText, insertValue)
        .then((result) => {
            let insertNewUserQuery;

            let healthNum = req.body.amountNum * 10;

            let maxNum = req.body.amountNum * 20;

            // console.log(healthNum);


            if (req.params.id === '1' || req.params.id === '2') {
                insertNewUserQuery = `
                    UPDATE "user"
                      SET "coins" = "coins" - ${healthNum}
                      WHERE "id" = $1
                      RETURNING "coins";
                      `;
            } else if (req.params.id === '3') {
                insertNewUserQuery = `
                    UPDATE "user"
                      SET "coins" = "coins" - ${maxNum}
                      WHERE "id" = $1
                      RETURNING "coins";
                      `;
            }

            const insertValue = [req.user.id]

            pool.query(insertNewUserQuery, insertValue)
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


router.put("/sell/item/:id", (req, res) => {
    // console.log(req.body.amountNum);
    const sqlText = `
        UPDATE "user_inventory"
        SET "number" = "number" - $1
          WHERE "user_id" = $2 AND "items_id" = $3;
          `;

    const insertValue = [req.body.amountNum, req.user.id, req.params.id]


    pool.query(sqlText, insertValue)
        .then((result) => {
            let insertNewUserQuery;

            let healthNum = req.body.amountNum * 5;

            let maxNum = req.body.amountNum * 10;

            console.log(healthNum);


            if (req.params.id === '1' || req.params.id === '2') {
                insertNewUserQuery = `
                        UPDATE "user"
                          SET "coins" = "coins" + ${healthNum}
                          WHERE "id" = $1
                          RETURNING "coins";
                          `;
            } else if (req.params.id === '3') {
                insertNewUserQuery = `
                        UPDATE "user"
                          SET "coins" = "coins" + ${maxNum}
                          WHERE "id" = $1
                          RETURNING "coins";
                          `;
            }

    const insertValue = [req.user.id]


            pool.query(insertNewUserQuery, insertValue)
                .then(result => {
                    res.sendStatus(201);
                })
        }).catch(err => {
            // catch for second query
            console.log('in the second', err);
            res.sendStatus(500)
        })
        .catch((err) => {
            console.log("Error in inventory.router /sell PUT,", err);
            res.sendStatus(500);
        });
});



router.put("/use/item/:id", (req, res) => {
    // console.log(req.body.amountNum);
    const sqlText = `
            UPDATE "user_inventory"
            SET "number" = "number" - 1
              WHERE "user_id" = $1 AND "items_id" = $2;
              `;

    const insertValue = [req.user.id, req.params.id]

    pool.query(sqlText, insertValue)
        .then(result => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log("Error in inventory.router /use PUT,", err);
            res.sendStatus(500);
        });
});






module.exports = router;
