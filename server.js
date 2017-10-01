const express = require('express');
const app = express();
const pg = require('pg');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true })); 


//Insert 2 records into the users table
var insert_records = function(req, res) {
  console.log('req body', req.body);
   
  var data = {
    fname: req.body.firstName, 
    lname: req.body.lastName, 
    email: req.body.email, 
    facebook: req.body.facebook,
    twitter: req.body.twitter, 
    linkedin: req.body.linkedin,
    profileName: req.body.profile, 
    password: req.body.pw, 
    pwConfirmed: req.body.pwConfirm, 
    bio: req.body.bio 
  };

  // Connect to DB
  const connectionString = process.env.ELEPHANTSQL_URL || "postgres://aydbgobp:cUZEYaKqQrQfjot3MP0XzInd3bCJ1SLV@elmer.db.elephantsql.com:5432/aydbgobp";
  
  const client = new pg.Client(connectionString);
  client.connect(); 

  // Creat table and insert records into it
  client.query("CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, firstname VARCHAR(64), lastname VARCHAR(64), email VARCHAR(64), facebook VARCHAR(64), twitter VARCHAR(64), linkedin VARCHAR(64), profileName VARCHAR(64), password VARCHAR(64), pwConfirm VARCHAR(64), bio VARCHAR(64))");
  client.query("INSERT INTO users(firstname, lastname, email, facebook, twitter, linkedin, profileName, password, pwConfirm, bio) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [data.fname, data.lname, data.email, data.facebook, data.twitter, data.linkedin, data.profileName, data.password, data.pwConfirmed, data.bio]);
}

app.get('/', (req, res) => {
  insert_records(req,res);
});

app.listen(3000, () => {
  console.log(`Listening on ${port}`);
});
