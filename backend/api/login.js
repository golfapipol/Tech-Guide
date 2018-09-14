const LoginService = require('../service/member').Login

const LoginHandler = (request, response, next) => {
    const {email,password} = request.body
    console.log("email", email, !email, "password", password, !password)
    if (!email || !password) {
        response.send(400, { response: "please input email and password" })
        return Promise.resolve(next())
    }
    return LoginService(email,password)
        .then((data) => {
            response.send(data)
            return next()
        })
        .catch((err) => {
            response.send(400, { response: err })
            return next()
        })
}

module.exports = LoginHandler
