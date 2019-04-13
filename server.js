require("dotenv").config();
//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var passport = require("passport");
var flash = require("connect-flash");
var cookieParser = require("cookie-parser");
var session = require("express-session");

var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./models");

//passing passport for configuration file
require("./config/passport")(passport);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(
  session({
    key: "user_sid",
    secret: "goN6DJJC6E287cC77kkdYuNuAyWnz7Q3iZj8",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./controllers/htmlRoutes")(app, passport);
require("./controllers/createtasks-controller")(app, passport);
require("./controllers/todo-controller")(app, passport);
require("./controllers/user-controller")(app, passport);
require("./controllers/reward-controller")(app, passport);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
