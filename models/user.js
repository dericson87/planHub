var uuidv1 = require("uuid/v1");
var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 30]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 100]
      }
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        len: [8]
      }
    }
  });

  User.associate = function(models) {
    User.hasMany(models.ToDo, {
      foreignKey: "ownerUuid",
      onDelete: "cascade"
    });
    User.hasMany(models.Reward, {
      foreignKey: "ownerUuid",
      onDelete: "cascade"
    });
  };

  // methods ======================
  // generating a hash
  User.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  // checking if password is valid
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
