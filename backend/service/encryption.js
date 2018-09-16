const crypto = require('crypto');

const generateSalt = (lengthOfCharacter = 16) => {
    return crypto.randomBytes(Math.ceil(lengthOfCharacter/2))
            .toString('hex') 
            .slice(0,lengthOfCharacter); 
}
const SHA512 = function(password, salt){
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

module.exports = {
    generateSalt,
    SHA512
}