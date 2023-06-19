const jwt = require('jsonwebtoken');

const genAuthToken = (musician) => {
    const secret = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
        {
        _id: musician._id,
        email: musician.email, 
        isAdmin: musician.isAdmin
        },
        secret, 
    );
    return token;
}

module.exports = genAuthToken;