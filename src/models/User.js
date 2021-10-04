module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        phone: {
            type: DataTypes.STRING,
            validate: {
                is: {
                    args: [/\+\d{1,4}\d{9}/],
                    msg: 'Invalid phone format'
                },
                isUnique(value) {
                    return User.findOne({ where: { phone: value } })
                        .then((name) => {
                            if (name) {
                                throw new Error('User with that phone number already exists');
                            }
                        })
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Invalid email'
                },
                isUnique(value) {
                    return User.findOne({ where: { email: value } })
                        .then((name) => {
                            if (name) {
                                throw new Error('User with that email already exists');
                            }
                        })
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
        underscored: true
    });

    return User;
}