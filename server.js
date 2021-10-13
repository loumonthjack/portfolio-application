const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const viewerApi = require('./controller/routes/public/viewersPage');
const landingApi = require('./controller/routes/public/landingPage');
const loginApi = require('./controller/routes/public/login');
const registerApi = require('./controller/routes/public/register');
const dashboardApi = require('./controller/routes/private/dashboard');
const billingApi = require('./controller/routes/private/billing');
const resumeApi = require('./controller/routes/private/resume');
const logoutApi = require('./controller/routes/private/logout');
const app = express();

// Bodyparser middleware
app.use(cors({
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}));

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db, {
      useNewUrlParser: true
    }, {
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: 'dsafiu6l4iw7toglejhsdfvfa',
    name: "session-cookie",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: oneDay
    }
    //store: RedisClient
  }));
app.use(
  bodyParser.json()
);
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(passport.initialize());
app.use(passport.session())

// Passport config
require("./config/passport")(passport);
app.use(cookieParser());

// Public Routes
app.use("/login", loginApi);
app.use("/register", registerApi);
app.use("/home", landingApi)
app.use("/portfolio", viewerApi)

function authorizeToken(req, res, next) {
  const header = req.headers['authorization'] && req.headers['authorization'].split(' ');
  const authorized = req.headers && req.headers['authorization'] && header[1]
  if (authorized) {
    next()
  } else {
    res.status(400).json({
      message: "Not Authorized. Try Logging In.."
    })
  }
}
// Private Routes
app.use('/dashboard', dashboardApi);
app.use('/resume', resumeApi);
app.use('/billing', billingApi);
app.use('/logout', logoutApi);

// RUN SERVER //
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));