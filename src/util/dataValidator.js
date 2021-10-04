const db = require('../models');
const Token = db.Token;

module.exports.validateToken = async (req, res, next) => {
    const token = req.headers['authorization'];

    return await Token
        .findOne({
            where: {
                token: token
            }
        })
        .then((tokenData) => {
            tokenData ? next() : res.status(401).end();
        })
        .catch((err) => {
            res.status(500)
                .send({ message: err.message || 'Unknown error' });
        })
};

module.exports.validateImage = async (req, res, next) => {
    if (req.headers['content-type'] !== 'multipart/form-data') {
        return res.status(422)
            .send({ message: 'Invalid content-type' });
    }
    next();
}

module.exports.validateItem = async (req, res, next) => {
    const title = req.body.title;
    
    if (!title || typeof title !== 'string') {
        return res.status(422)
            .send({message: 'Invalid title'});
    }

    const price = req.body.price;

    if (!price || typeof price !== 'number') {
        return res.status(422)
            .send({message: 'Invalid price'});
    }

    next();
}