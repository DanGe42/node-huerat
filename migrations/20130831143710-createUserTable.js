module.exports = {
    up: function(migration, DataTypes, done) {
        migration.createTable(
            'Users',
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                password_hash: {
                    type: DataTypes.STRING(60),
                    allowNull: false
                },
                hue_user:  {
                    type: DataTypes.STRING(40),
                    allowNull: false,
                    unique: true
                }
            },
            {
                charset: 'utf8'
            }
        );
        done();
    },
    down: function(migration, DataTypes, done) {
        migration.dropTable('Users');
        done();
    }
};