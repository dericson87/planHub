var db = require("../models");
var passport = require("passport");

module.exports = function(app) {

  //Brings to add-items form.
  app.get("/createtasks", function(req, res) {
    if (req.isAuthenticated()) {
      db.User.findByPk(req.user.uuid).then(function(dbUser) {
        var hbsObj = {
          todos: [],
          completed: [],
          rewards: [],
          chosen: [],
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

          dbUser.getRewards().then(function(dbRewards) {
            dbRewards.forEach(function(reward) {
              if (reward.chosen) {
                hbsObj.chosen.push(reward.dataValues);
              } else {
                hbsObj.rewards.push(reward.dataValues);
              }
            });

            res.render("createtasks", hbsObj);
          });
        });
      });
    } else {
      res.redirect("/login");
    }
  });

  //mark a task incomplete
  app.post("/task-undo/:id", function(req, res) {
    if (req.isAuthenticated()) {
      db.ToDo.findByPk(req.params.id)
        .then(function(dbTodo) {
          dbTodo.completed = false;
          dbTodo.save();
        })
        .then(function() {
          res.redirect("/createtasks");
        });
    }
  });

  //Add a task
  app.post("/task", function(req, res) {
    if (req.isAuthenticated()) {
      console.log("Creating todo");
      db.ToDo.create({
        task: req.body.task_name,
        completed: false,
        ownerUuid: req.user.uuid
      }).then(function(dbTodo) {
        res.redirect("/createtasks");
      });
    } else {
      res.redirect("/login");
    }
  });

  //Delete a Task
  app.post("/task-delete/:id", function(req, res) {
    if (req.isAuthenticated()) {
      console.log("Deleting a task");
      db.ToDo.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbTodo) {
        res.redirect("/createtasks");
      });
    } else {
      res.redirect("/login");
    }
  });
};
