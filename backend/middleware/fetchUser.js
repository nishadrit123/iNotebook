const secret_key = require('../secret')
const jwt = require('jsonwebtoken');
const jwtSecret = secret_key;

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (! token) res.status(401).send({error: 'Please authenticate using valid token'});
    try {
        const data = jwt.verify(token, jwtSecret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: 'Please authenticate using valid token'});
    }
}

module.exports = fetchUser;