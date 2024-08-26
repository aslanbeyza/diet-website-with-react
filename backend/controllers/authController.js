const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const db = require('../models');



const register = async (req, res) => {
/*     console.log("me") */ 
   const errors = validationResult(req);
   console.log("body" ,req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, lastName, email, password, role,} = req.body;
        console.log(lastName);
    try {
        let user = await db.User.findOne({where: {email: email}});
        
        if (user) {
            return res.status(400).json({msg: 'User already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await db.User.create({
            name: name,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            role: "user",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const payload = {userId: user.id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(201).json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await db.User.findOne({where: {email: email}});

        if (!user) {
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        const payload = {userId: user.id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    } 
};

const me = async (req, res) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await db.User.findByPk(decoded.userId);

        if (!user) {
            return res.status(401).json({msg: 'Invalid token'});
        }

        res.status(200).json({user: {id: user.id, name: user.name, email: user.email}});
    } catch (err) {
        res.status(401).json({msg: 'Invalid token'});
    }
};

module.exports = {
    register,
    login,
    me,
};
