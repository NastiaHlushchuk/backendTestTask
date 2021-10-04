const router = require('express').Router();
const ItemController = require('../../controllers/ItemController');
const ImageController = require('../../controllers/ImageController');
const dataValidator = require('../../util/dataValidator');
const restUtil = require('../../util/restUtil');

const validateItem = dataValidator.validateItem;
const validateToken = dataValidator.validateToken;
const validateImage = dataValidator.validateImage;

const handleResponse = restUtil.handleResponse;

router.get('/', async (req, res) => {
    return await ItemController
        .getAll()
        .then(handleResponse(res));
});

router.post('/', validateToken, validateItem, async (req, res) => {
    const item = {
        title: req.body.title,
        price: req.body.price
    }
    const token = req.headers['authorization'];

    return await ItemController
        .create(item, token)
        .then(handleResponse(res));
});

router.get('/:itemId', async (req, res) => {
    const itemId = req.params.itemId;

    return await ItemController
        .getById(itemId)
        .then(handleResponse(res));
});

router.put('/:itemId', validateToken, async (req, res) => {
    const itemId = req.params.itemId;
    const item = {
        title: req.body.title,
        price: req.body.price
    }

    return await ItemController
        .updateById(itemId, item)
        .then(handleResponse(res));
});

router.delete('/:itemId', validateToken, async (req, res) => {
    const itemId = req.params.itemId;

    return await ItemController
        .deleteById(itemId)
        .then(handleResponse(res));
});

router.post('/:itemId/images', validateToken, validateImage, async (req, res) => {
    const itemId = req.params.itemId;
    const imageBytes = await req.read();
    console.log(imageBytes);

    return await ImageController
        .addImage(itemId, imageBytes)
        .then(handleResponse(res));
    // const something = req.file;
    // console.log(something);

    // res.status = 200;
    // res.end('POST upload item image');
});

module.exports = router;