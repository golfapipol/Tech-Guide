const TokenService = require('./token')

const MemberService = (memberRepository) => ({
    register: ({email, password, fullname, phone}) => 
        memberRepository.create(email, password, fullname, phone)
            .then(({email, fullname, phone}) => ({email, fullname, phone}))
    , 
    login: (email,password) => 
         memberRepository.findByEmail(email)
            .then((account) => {
                if (!account) {
                    return Promise.reject("invalid username, password")
                }
                if (account.password != password) {
                    return Promise.reject("invalid username, password")
                }
                return Promise.resolve(TokenService.generate({email: account.email}))
            })
})
module.exports = MemberService
 