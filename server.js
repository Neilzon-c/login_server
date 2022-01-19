const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser')
const app = express();

// CORS for react app, assuming port 3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

// use middleware to serve static images
app.use(express.static('public'))

//parse post json request body
app.use(bodyParser.urlencoded({
  extended: true
}));

// read data from options file
const loginDetailsRaw = fs.readFileSync('./login-details.json', 'utf-8');
const loginDetails = JSON.parse(loginDetailsRaw);

app.get('/login/userDetails', (req, res, next) => {
  // return data from file
  // if(req.query.token == "this_is_a_dummy_token_sha256")
  //   res.json(loginDetails.authenticatedUser)
  // else{
  //     console.log("error else");
  //     next();
  // }
  res.json(loginDetails.authenticatedUser)

})

app.post('/login', (req, res) => {
  var user_name = req.body.user;
  var password = req.body.password;

  //hardcoded for now
  if(user_name === 'admin' && password === 'admin')
  {
    console.log("User name = "+user_name+", password is "+password);
    res.status(200)
    res.end("success");
  }
  else{
    res.status(401)
    res.end("unsuccessful")
  }
})

if (require.main === module) {
  app.listen(3030, () => console.log('Login server listening on port 3030!'))
}

module.exports = app;