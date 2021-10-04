const passwordHash = require('password-hash');

module.exports.encrypt = (password) => {
    return passwordHash.generate(password);
};

module.exports.verify = (password, hashedPassword) => {
    return passwordHash.verify(password, hashedPassword);
}