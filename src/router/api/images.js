const router = require('express').Router();

const ImageController = require('../../controllers/ImageController');

router.get('/:imageId', async (req, res) => {
    const imageId = req.params.imageId;

    return await ImageController
        .getById(imageId)
        .then((response) => {
            res.status(response.status)
                .end(response.body);
        });
});

module.exports = router;