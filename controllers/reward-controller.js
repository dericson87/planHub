var db = require("../models");

module.exports = function(app) {
  //mark a reward chosen
  app.post("/item-chosen/:id", function(req, res) {
    if (req.isAuthenticated()) {
      db.Reward.findByPk(req.params.id)
        .then(function(dbReward) {
          dbReward.chosen = true;
          dbReward.save();
        })
        .then(function() {
          res.redirect("/createtasks");
        });
    }
  });
  //mark a reward incomplete
  app.post("/item-undo/:id", function(req, res) {
    if (req.isAuthenticated()) {
      db.Reward.findByPk(req.params.id)
        .then(function(dbReward) {
          dbReward.chosen = false;
          dbReward.save();
        })
        .then(function() {
          res.redirect("/createtasks");
        });
    }
  });
  //Add a reward
  app.post("/item", function(req, res) {
    if (req.isAuthenticated()) {
      console.log("Creating Reward");
      db.Reward.create({
        item: req.body.item_name,
        chosen: false,
        ownerUuid: req.user.uuid
      }).then(function(dbReward) {
        res.redirect("/createtasks");
      });
    } else {
      res.redirect("/login");
    }
  });

  //Delete a reward
  app.post("/item-delete/:id", function(req, res) {
    if (req.isAuthenticated()) {
      console.log("Deleting an item");
      db.Reward.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbReward) {
        res.redirect("/createtasks");
      });
    } else {
      res.redirect("/login");
    }
  });
};
