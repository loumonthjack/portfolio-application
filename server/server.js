const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const app = express();

// Routes
const viewerApi = require('./controller/routes/public/viewersPage');
const landingApi = require('./controller/routes/public/landingPage');
const loginApi = require('./controller/routes/public/login');
const registerApi = require('./controller/routes/public/register');
const dashboardApi = require('./controller/routes/private/dashboard');
const billingApi = require('./controller/routes/private/billing');
const resumeApi = require('./controller/routes/private/resume');
const { authorizeToken } = require('./controller/middleware/authorize')

// Bodyparser middleware
app.use(cors({
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}));

// DB Config
const db = require("./config/keys").mongoURI;
const { v4 } = require("uuid");

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
const oneDay = 3600000;
app.use(
  session({
    secret: v4(),
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

// Private Routes
app.use('/dashboard', authorizeToken, dashboardApi);
app.use('/resume', authorizeToken, resumeApi);
app.use('/billing', authorizeToken, billingApi);

// RUN SERVER //
const port = 4000 || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));