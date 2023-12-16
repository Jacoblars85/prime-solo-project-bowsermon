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
          ("user_id", "character_id")
          VALUES
          ($1, 1);
      `;
      const insertNewUserValues = [createdUserId]
      // SECOND QUERY ADDS user_id to user_characeters
      pool.query(insertNewUserQuery, insertNewUserValues)
        // was here for basic
        .then(() => res.sendStatus(201))
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


router.put("/:id", (req, res) => {

  const sqlText = `
  UPDATE "user"
    SET "username" = ($1)
    WHERE "id" = '${req.params.id}';
    `;

  const sqlValues = [req.body.category_id];

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
router.delete("/:id", (req, res) => {

  const sqlText = `
    DELETE FROM "completed_levels"
      WHERE "id" = ${req.params.id};
      `;

  pool
    .query(sqlText)



    .then(result => {


      // Now handle the user_characters reference:
      const insertNewUserQuery = `
      DELETE FROM "user_characters"
        WHERE "id" = ${req.params.id};`


      // SECOND QUERY DELETES user_id from user_characeters
      pool.query(insertNewUserQuery)


        .then(result => {


          // Now handle the user_characters reference:
          const insertNewUserQuery = `
        DELETE FROM "user"
          WHERE "id" = ${req.params.id};`

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

module.exports = router;
