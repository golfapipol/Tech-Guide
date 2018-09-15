const RegisterHandler = (MemberService) => 
    (request, response, next) => {
        if (["email", "password", "fullname", "phone"].some((key) => !request.body[key])) {
            response.send(400, { response: "please input email, password, fullname and phone" })
            return Promise.resolve(next())
        }
        const {email, password, fullname, phone} = request.body
        return MemberService.register({email, password, fullname, phone})
            .then((data) => {
                response.send(data)
                return next()
            })
            .catch((err) => {
                response.send(400, { response: err })
                return next()
            })
        return Promise.resolve(next())
    }

module.exports = RegisterHandler
