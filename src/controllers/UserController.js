const stringUtil = require('../util/stringUtil');
const hashUtil = require('../util/hashUtil');
const restUtil = require('../util/restUtil');
const dataSanitizer = require('../util/dataSanitizer');

const handleError = restUtil.handleError;

const db = require('../models');
const User = db.User;
const Token = db.Token;

module.exports.create = async (user) => {
    //TODO: validate data in a prettier way
    if (!user.name || !user.email || !user.password) {
        return {
            status: 422,
            body: { message: "Insufficient data" }
        }
    }

    user.password = hashUtil.encrypt(user.password);

    //TODO: make tokens temporary

    return await User
        .create(user)
        .then(async (userData) => {
            const token = {
                token: stringUtil.generateToken()
            };

            return await Token
                .create(token)
                .then((tokenData) => {
                    tokenData.setUser(userData);
                    return {
                        status: 200,
                        body: token
                    };
                });
        })
        .catch(handleError);
}


module.exports.getByToken = async (token) => {
    return await Token
        .findOne({
            where: {
                token: token
            }
        })
        .then(async (tokenData) => {
            if (!tokenData) {
                return {
                    status: 401
                };
            }

            const user = await tokenData.getUser({
                attributes: { exclude: ['password'] }
            });
            return {
                status: 200,
                body: user
            };
        })
        .catch(handleError);
}


module.exports.getTokenByLoginAndPassword = async (credentials) => {
    return await User
        .findOne({
            where: {
                email: credentials.email
            }
        })
        .then(async (userData) => {
            if (hashUtil.verify(credentials.password, userData.password)) {
                return await Token
                    .findOne({
                        where: {
                            userId: userData.id
                        },
                        attributes: ['token']
                    })
                    .then((tokenData) => {
                        return {
                            status: 200,
                            body: tokenData
                        };
                    })

            } else {
                return {
                    status: 422,
                    body: {
                        message: "Wrong email or password"
                    }
                };
            }
        })
        .catch(handleError);

}