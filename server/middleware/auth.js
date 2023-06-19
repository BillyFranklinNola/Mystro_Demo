const jwt = require("jsonwebtoken");
const Musician = require("../models/musician.model");

const auth =  async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split('')[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.musician = await Musician.findById(decoded.id).select("-password")
            next();
        } catch (err) {
            console.error(err.message);
            res.status(401).json({ msg: "Not authorized" });
        }
    } else {
        res.status(401).json({ msg: "Not authorized, no token" });
    }
    console.log(token);
};

const isAdmin = (req, res, next) => {
    auth(req, res, () => {
        if (req.musician.isAdmin){
            next();
        } else {
            res.status(403).json({ msg: "Not authorized as an admin" });
        }
    });
};

module.exports = { auth, isAdmin };