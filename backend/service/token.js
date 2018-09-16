const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || "getlinks"

module.exports = {
    generate: (payload) => {
        token = jwt.sign(payload, SECRET, {
            expiresIn: "1m"
        });
        let { iat, exp } = jwt.decode(token);
        return {
            token,
            issuedAt: iat,
            expiredAt: exp
        }
    }    
}