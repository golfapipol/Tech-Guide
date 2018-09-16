const TokenService = require('../service/token')

const HelloHandler = (request, response, next) => {
    const token = request.headers['x-access-token']
    if (!token) {
        response.send(401, {response: "unauthorized"})
        return next()
    }
    if (!TokenService.check(token)) {
        response.send(401, {response: "token already expired"})
        return next()
    }
    response.send("hello")
    return next()
}

module.exports = HelloHandler