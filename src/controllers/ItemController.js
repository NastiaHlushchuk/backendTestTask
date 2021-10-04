const restUtil = require('../util/restUtil');
const dataSanitizer = require('../util/dataSanitizer');

const handleError = restUtil.handleError;

const db = require('../models');
const User = db.User;
const Item = db.Item;
const Token = db.Token;
const Image = db.Image;

module.exports.getAll = async () => {
    return await Item
        .findAll({
            include: [{
                model: User,
                attributes: { exclude: ['password'] }
            }, {
                model: Image,
                attributes: ['id']
            }]
        })
        .then(items => {
            return {
                status: 200,
                body: dataSanitizer.sanitizeItems(items) || []
            }
        })
        .catch(handleError);
};

module.exports.create = async (item, token) => {
    const tokenData = await Token
        .findOne({
            include: [{
                model: User,
                attributes: { exclude: ['password'] }
            }],
            where: {
                token: token
            }
        })
        .catch(handleError);

    item.created_at = new Date();

    return await Item
        .create(item)
        .then(async (itemData) => {
            await itemData.setUser(tokenData.user);

            // need this ugly step because 'include: User' option
            // cannot be added after the object has been created
            const reloadedItem = await this.getById(itemData.id)
                .then(data => data.body);

            return {
                status: 200,
                body: reloadedItem
            };
        })
        .catch(handleError);
};

module.exports.getById = async (itemId) => {
    return await Item
        .findOne({
            include: [{
                model: User,
                attributes: { exclude: ['password'] }
            }, {
                model: Image,
                attributes: ['id']
            }],
            where: {
                id: itemId
            }
        })
        .then((itemData) => {
            return {

                status: itemData ? 200 : 404,
                body: dataSanitizer.sanitizeItem(itemData)
            };
        })
        .catch(handleError);
};

module.exports.updateById = async (itemId, item) => {
    return await Item
        .findOne({
            include: [{
                model: User,
                attributes: { exclude: ['password'] }
            }, {
                model: Image,
                attributes: ['id']
            }],
            where: {
                id: itemId
            }
        })
        .then(async (itemData) => {
            if (!itemData) {
                return {
                    status: 404
                };
            }

            for (const key in item) {
                if (item[key]) {
                    itemData[key] = item[key];
                }
            }
            await itemData.save();

            return {
                status: 200,
                body: dataSanitizer.sanitizeItem(itemData)
            }
        })
        .catch(handleError);


};

module.exports.deleteById = async (itemId) => {
    return await Item
        .findOne({
            where: {
                id: itemId
            }
        })
        .then(async (itemData) => {
            if (!itemData) {
                return {
                    status: 404
                };
            }

            await itemData.destroy();
            return {
                status: 200
            }
        })
        .catch(handleError);
};
