const config = require('../config');

const url = config.system.url;

module.exports.sanitizeItem = (item) => {
    return item && {
        id: item.id,
        created_at: item.created_at && Math.round(item.created_at / 1000),
        title: item.title,
        price: item.price,
        images: this.sanitizeImages(item.images),
        user_id: item.userId,
        user: item.user
    };
};

module.exports.sanitizeItems = (items) => {
    return items && items.map((item) => {
        return this.sanitizeItem(item);
    });
};

module.exports.sanitizeImages = (images) => {
    return images && images.map((image) => {
        return this.sanitizeImage(image);
    });
}

module.exports.sanitizeImage = (image) => {
    return image && url + '/api/images/' + image.id;
};