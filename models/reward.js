module.exports = function(sequelize, DataTypes) {
  var Reward = sequelize.define("Reward", {
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    chosen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Reward.associate = function(models) {
    Reward.belongsTo(models.User, {
      foreignKey: "ownerUuid"
    });
  };

  return Reward;
};
