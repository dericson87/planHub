var db = require("../models");

module.exports = function(app) {
  app.get("/justin", function(req, res) {
    res.render("createtasks", {});
  });
};
