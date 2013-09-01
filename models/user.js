module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password_hash: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        hue_user: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true
        }
    });
};