const RegisterHandler = (MemberService) => 
    (request, response, next) => {
        return Promise.resolve(next())
    }

module.exports = RegisterHandler
