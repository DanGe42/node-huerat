module.exports = {
    up: function(migration, DataTypes, done) {
        migration.removeColumn('Bridges', 'user_id');
        done();
    },
    down: function(migration, DataTypes, done) {
        migration.addColumn(
            'Bridges',
            'user_id',
            {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        );
        done();
    }
};