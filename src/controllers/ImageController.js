const restUtil = require('../util/restUtil');
const ItemController = require('./ItemController');

const db = require('../models');
const User = db.User;
const Item = db.Item;
const Image = db.Image;

const handleError = restUtil.handleError;

module.exports.addImage = async (itemId, imageBytes) => {
    const itemData = await Item
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
        .catch(handleError);

    if (!itemData) {
        return {
            status: 404
        };
    }

    const image = {
        imageBytes: imageBytes
    };

    return await Image
        .create(image)
        .then(async (imageData) => {
            await imageData.setItem(itemData);
            return await ItemController
                .getById(itemId);
        })
        .catch(handleError);
};

module.exports.getById = async (imageId) => {
    return await Image
        .findOne({
            where: {
                id: imageId
            }
        })
        .then((imageData) => {
            if (!imageData) {
                return {
                    status: 404
                };
            }

            return {
                status: 200,
                body: imageData.imageBytes
            };
        })
        .catch(handleError);
};