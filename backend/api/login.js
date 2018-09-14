const LoginService = require('../service/member').Login

const LoginHandler = (request, response, next) => {
    const {email,password} = request.body
    if (!email || !password) {
        response.send(400, { response: "please input email and password" })
        return next()
    }
    return LoginService(email,password)
        .then((data) => {
            response.send(data)
            return next()
        })
        .catch((err) => {
            response.send(400, { response: err.ToString() })
            return next()
        })
}

module.exports = LoginHandler
