module.exports = {
    up: function(migration, DataTypes, done) {
        migration.createTable(
            'Bridges',
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
                hostname: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                internal_id: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            {
                charset: 'utf8'
            }
        );
        done();
    },
    down: function(migration, DataTypes, done) {
        migration.dropTable('Bridges');
    }
};