module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('item', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        created_at: {
            type: DataTypes.DATE
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE.UNSIGNED,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: "Invalid price value"
                },
                isNotNegative(value) {
                    if (value < 0) {
                        throw new Error("Price cannot be negative");
                    }
                }
            }
        }
    }, {
        timestamps: false,
        underscored: true
    });

    return Item;
}