const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretkey = require('../db')
const users = require('../models/User')
const fetchuser = require('../middleware/userdetail')


// create a user using : POST "/api/auth/createuser" 
router.post('/register', body('name', 'enter a valid name').isLength({ min: 3 }),
    body('password', 'enter a valid password').isLength({ min: 5 }),
    body('email', 'enter a valid email').isEmail(), async (req, res) => {

        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ err: error.array(), error: "something is wrong in data" })
        }
        // users(req.body).save();
        // res.send(req.body);  // or
        try {
            let user = await users.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "sorry email already exists" });
            }
            const salt = await bcryptjs.genSalt(10);
            const secPass = await bcryptjs.hash(req.body.password, salt);
            user = await users.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            })
            const authtoken = jwt.sign(user.id, secretkey.secret);
            res.json({ authtoken, user })
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error")
        }
    }
)

// Authenticate a user : POST "/api/auth/login" 
router.post('/login', body('password', 'enter a valid password').exists(),
    body('email', 'enter a valid email').isEmail(), async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array(), error:"use correct information" })
        }

        const { email, password } = req.body;
        try {
            let user = await users.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "your email is incorrect" })
            }

            const passwordCompare = await bcryptjs.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "your password is incorrect" })
            }

            const authtoken = jwt.sign(user.id, secretkey.secret);
            res.json({ authtoken });

        } catch (error) {
            console.error(error.message);
            return res.status(500).send("internal server error")
        }
    }
)

// get logged in user detail or profile of user : 
// "/api/auth/getuser"

router.post('/getuser',fetchuser,  async (req, res) => {
    try {
        // const token = req.header('auth-token');
        // if (!token) {
        //     return res.status(401).send({ error: "please authenticate using a valid token" })
        // }
        // try {
        //     const id = jwt.verify(token, secretkey.secret)
        //    
        //     const user = await users.findById(id).select("-password")
        //     res.send(user);
        // } catch (error) {
        //     return res.status(401).send({ error: "authenticate using a valid token" })
        // }
        // this we use if we are not using middleware userdetail.js

        // console.log(req.user.id);
        const user = await users.findById(req.user.id).select("-password")
        res.send(user);
        // if we use this method then we will be using userdetail file here
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
}
)
module.exports = router;