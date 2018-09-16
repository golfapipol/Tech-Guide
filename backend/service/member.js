const TokenService = require('./token')
const {generateSalt, SHA512} = require('./encryption')
const MemberService = (memberRepository) => ({
    register: ({email, password, fullname, phone}) => {
        const salt = generateSalt()
        const encryptedHash = SHA512(password, salt)
        return memberRepository.create(email, encryptedHash.passwordHash, encryptedHash.salt, fullname, phone)
            .then(({email, fullname, phone}) => ({email, fullname, phone}))
    }, 
    login: (email,password) => 
         memberRepository.findByEmail(email)
            .then((account) => {
                if (!account) {
                    return Promise.reject("invalid username, password")
                }
                const actualPassword = SHA512(password, account.salt)
                const realPassword = SHA512(account.password, account.salt)
                if (realPassword.passwordHash != actualPassword.passwordHash) {
                    return Promise.reject("invalid username, password")
                }
                return Promise.resolve(TokenService.generate({email: account.email}))
            })
})
module.exports = MemberService
 