const LoginHandler = (MemberService) => 
    (request, response, next) => {
        const {email,password} = request.body
        if (!email || !password) {
            response.send(400, { response: "please input email and password" })
            return Promise.resolve(next())
        }
        return MemberService.login(email,password)
            .then((data) => {
                response.send(data)
                return next()
            })
            .catch((err) => {
                console.error(err)
                response.send(400, { response: err })
                return next()
            })
    }

module.exports = LoginHandler
