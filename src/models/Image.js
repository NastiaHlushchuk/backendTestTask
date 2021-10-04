module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('image', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        imageBytes: {
            type: DataTypes.BLOB,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true
    });

    return Image;
}