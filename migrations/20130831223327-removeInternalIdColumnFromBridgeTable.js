module.exports = {
    up: function(migration, DataTypes, done) {
        migration.removeColumn('Bridges', 'internal_id');
        done();
    },
    down: function(migration, DataTypes, done) {
        migration.addColumn(
            'Bridges',
            'internal_id',
            {
                type: DataTypes.STRING,
                allowNull: false
            }
        );
        done();
    }
};