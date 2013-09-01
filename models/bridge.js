module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Bridge', {
        hostname: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};
