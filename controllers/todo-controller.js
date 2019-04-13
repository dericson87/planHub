var db = require("../models");

var giphyIds = [
  "29rsFlMw8wLlxOCPH1",
  "vxXEa8lfyMyTLC521v",
  "tsUPewJtdiHEFKxvZ0",
  "3LKpJDAXQfKgQ3xTPv",
  "13hxeOYjoTWtK8",
  "5tsatyYOuAlVKyAqQS",
  "MRXdvH6gdFPAx22RAv"
];

function getRandomGif() {
  var index = Math.floor(Math.random() * giphyIds.length);
  return "https://media.giphy.com/media/" + giphyIds[index] + "/giphy.gif";
}

module.exports = function(app) {
  app.get("/", function(req, res) {
    if (req.isAuthenticated()) {
      db.User.findByPk(req.user.uuid).then(function(dbUser) {
        var hbsObj = {
          todos: [],
          completed: [],
          rewards: [],
          gif: getRandomGif(),
          user: req.user,
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };

        dbUser.getToDos().then(function(dbToDo) {
          dbToDo.forEach(function(task) {
            if (task.completed) {
              hbsObj.completed.push(task.dataValues);
            } else {
              hbsObj.todos.push(task.dataValues);
            }
          });

          if (hbsObj.completed.length > 0 && hbsObj.todos.length === 0) {
            dbUser.getRewards().then(function(dbRewards) {
              dbRewards.forEach(function(reward) {
                if (!reward.chosen) {
                  hbsObj.rewards.push(reward.dataValues);
                }
              });

              res.render("home", hbsObj);
            });
          } else {
            res.render("home", hbsObj);
          }
        });
      });
    } else {
      res.redirect("/login");
    }
  });
  //mark a task complete
  app.post("/task-complete/:id", function(req, res) {
    if (req.isAuthenticated()) {
      db.ToDo.findByPk(req.params.id)
        .then(function(dbTodo) {
          dbTodo.completed = true;
          dbTodo.save();
        })
        .then(function() {
          res.redirect("/");
        });
    }
  });
};
