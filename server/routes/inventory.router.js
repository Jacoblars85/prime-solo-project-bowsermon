const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')



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


router.put("/potion/:id", (req, res) => {

    const sqlText = `
    UPDATE "user_inventory"
    SET "number" = "number" + 1
      WHERE "user_id" = ${[req.user.id]} AND "items_id" = ${req.params.id};
  
      `;

    pool.query(sqlText)
        .then((result) => {
            let insertNewUserQuery;

            if (req.params.id === '1' || req.params.id === '2') {
                insertNewUserQuery = `
                    UPDATE "user"
                      SET "coins" = "coins" - 10
                      WHERE "id" = ${[req.user.id]};
                      `;
            } else if (req.params.id === '3') {
                 insertNewUserQuery = `
                    UPDATE "user"
                      SET "coins" = "coins" - 20
                      WHERE "id" = ${[req.user.id]};
                      `;
            }

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
