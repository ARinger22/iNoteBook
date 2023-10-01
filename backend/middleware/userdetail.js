const jwt = require('jsonwebtoken');
const secretkey = require('../db');

const fetchuser = (req, res, next) =>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error: "please authenticate using a valid token"})
    }
    try {
        const id = jwt.verify(token, secretkey.secret)
        req.user = { id: id };
        next();
    } catch (error) {
        return res.status(401).send({ error: "authenticate using a valid token" })
    }
}

module.exports = fetchuser; 