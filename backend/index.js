const pg = require('pg');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

const port=3000;

const pool = new pg.Pool({
    user: 'secadv',
    host: 'db',
    database: 'pxldb',
    password: 'ilovesecurity',
    port: 5432,
    connectionTimeoutMillis: 5000
})

console.log("Connecting...:")

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/authenticate/:username/:password', async (request, response) => {
    const validator = require('validator');
    const crypto = require('crypto');
    
    const username = validator.escape(request.params.username);
    const password = validator.escape(request.params.password);

    const hashedPassword = '\\x' + crypto.createHash('sha256').update(password).digest('hex');
    console.log(hashedPassword)

    const query = `SELECT * FROM users WHERE user_name='${username}' and password='${hashedPassword}'`;
    console.log(query);
    pool.query(query, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)});
      
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

