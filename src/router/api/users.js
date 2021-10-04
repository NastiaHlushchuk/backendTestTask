const router = require('express').Router();
const UserController = require('../../controllers/UserController');
const dataValidator = require('../../util/dataValidator');
const restUtil = require('../../util/restUtil');

const validateToken = dataValidator.validateToken;

const handleResponse = restUtil.handleResponse;

router.post('/login', async (req, res) => {
    const credentials = {
        email: req.body.email,
        password: req.body.password
    };

    return await UserController
        .getTokenByLoginAndPassword(credentials)
        .then(handleResponse(res));
});

router.post('/register', async (req, res) => {
    const user = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    }

    return await UserController
        .create(user)
        .then(handleResponse(res));
});

router.get('/me', validateToken, async (req, res) => {
    const token = req.headers['authorization'];

    return await UserController
        .getByToken(token)
        .then(handleResponse(res));
});


module.exports = router;