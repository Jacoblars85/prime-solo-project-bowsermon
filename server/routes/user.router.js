const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])

    // new stuff to add basic character to new user
    .then(result => {
      // ID IS HERE!
      console.log('New user Id:', result.rows[0].id);
      const createdUserId = result.rows[0].id

      // Now handle the user_characters reference:
      const insertNewUserQuery = `
        INSERT INTO "user_characters" 
          ("user_id", "character_id", "starter_1")
          VALUES
          ($1, 1, TRUE) 
          RETURNING user_id;
      `;
      const insertNewUserValues = [createdUserId]
      // SECOND QUERY ADDS user_id to user_characeters
      pool.query(insertNewUserQuery, insertNewUserValues)
        .then(result => {
          // ID IS HERE!
          console.log('New user Id:', result.rows[0].user_id);
          const createdUserId = result.rows[0].user_id

          // Now handle the user_characters reference:
          const insertNewUserQuery = `
          INSERT INTO "user_inventory" 
            ("user_id", "items_id", "number")
            VALUES
            ($1, 1, 0),
            ($1, 2, 0),
            ($1, 3, 0);
        `;
          const insertNewUserValues = [createdUserId]

          pool.query(insertNewUserQuery, insertNewUserValues)
            // was here for basic
            .then(() => res.sendStatus(201))
        }).catch(err => {
          // catch for third query
          console.log(err);
          res.sendStatus(500)
        })
    }).catch(err => {
      // catch for second query
      console.log(err);
      res.sendStatus(500)
    })
    // for the first query
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});


router.put("/change", (req, res) => {
  // console.log('req.body', req.body.newName);
  const sqlText = `
  UPDATE "user"
    SET "username" = ($1)
    WHERE "id" = '${[req.user.id]}';
    `;

  const sqlValues = [req.body.newName];

  pool
    .query(sqlText, sqlValues)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error in user.router PUT changing name,", err);
      res.sendStatus(500);
    });
});


// delete the users account
router.delete("/", (req, res) => {

  const sqlText = `
    DELETE FROM "user_inventory"
      WHERE "user_id" = ${[req.user.id]};
      `;

  pool
    .query(sqlText)
    .then(result => {

      // Now handle the user_characters reference:
      const insertNewUserQuery = `
      DELETE FROM "user_characters"
        WHERE "user_id" = ${[req.user.id]};
        `

      // SECOND QUERY DELETES user_id from user_characeters
      pool.query(insertNewUserQuery)
        .then(result => {

          // Now handle the user_characters reference:
          const insertNewUserQuery = `
        DELETE FROM "user"
          WHERE "id" = ${[req.user.id]};`

          // Third QUERY DELETES user from user table
          pool.query(insertNewUserQuery)

            // was here for basic
            .then((result) => {
              res.sendStatus(201);
            })
        }).catch(err => {
          // catch for third query
          console.log('in the third', err);
          res.sendStatus(500)
        })
    }).catch(err => {
      // catch for second query
      console.log('in the second', err);
      res.sendStatus(500)
    })
    .catch((err) => {
      console.log("Error in user.router DELETE, deleting account", err);
      res.sendStatus(500);
    });
});


router.put("/won/:id", (req, res) => {

  const sqlText = `
  UPDATE "user"
        SET "coins" = "coins" + 10
        WHERE "id" = '${[req.user.id]}';
    `;



  pool.query(sqlText)
    .then((result) => {

      const insertNewUserQuery = `
      UPDATE "user"
        SET "level_${req.params.id}_completed" = TRUE
        WHERE "id" = ${[req.user.id]};
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
      console.log("Error in user.router /won PUT,", err);
      res.sendStatus(500);
    });
});


// user watched credits and turns it to true
router.put("/credits", (req, res) => {
  // console.log('are we here?');
  const sqlText = `
  UPDATE "user"
    SET "credit_video_completed" = true, "coins" = "coins" + 15
    WHERE "id" = $1;
    `;

  const sqlValues = [req.user.id];

  pool
    .query(sqlText, sqlValues)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error in user.router PUT changing credits to true,", err);
      res.sendStatus(500);
    });
});




module.exports = router;
