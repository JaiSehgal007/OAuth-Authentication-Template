require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("./config/passport-setup"); // Use the passport setup file directly
const authRoute = require("./routes/auth");
const connectDB = require("./config/db");
const expressSession = require('express-session');
const app = express();

connectDB();

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods:"GET,POST,PUT,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  expressSession({
    secret: 'SecretOfPerfection20XY24',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

console.log('Passport middleware initialized');

app.use("/auth", authRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));
