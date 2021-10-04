module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('token', {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        }
    }, {
        timestamps: false,
        underscored: true
    });

    return Token;
}