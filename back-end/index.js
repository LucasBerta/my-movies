const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./common/db');
const { getUserByKey } = require('./service/user.service');
const { createUser } = require('./db/user.db');
// const DB = require('./common/db');

//Routes
const discover = require('./routes/discover');
const movie = require('./routes/movie');
const user = require('./routes/user');
const auth = require('./routes/auth');
const { handleAsyncFunction } = require('./common/util');

const app = express();
const port = 3001;

connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(async function (req, res, next) {
  const cookies = req.headers.cookie;

  if (!!cookies) {
    req.userKey = new RegExp(/key=\d+/g).exec(cookies)[0].replace('key=', '');
    await createUser({ key: req.userKey });

    const loggedUser = await getUserByKey(req.userKey);
    res.setHeader('Logged-User-Id', loggedUser._id);
  }

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use('/', discover);
app.use('/', movie);
app.use('/', user);
app.use('/', auth);

app.listen(port, () => console.log(`Server is running on port ${port}`));