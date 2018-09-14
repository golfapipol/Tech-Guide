const LoginHandler = require("./login")

const mockResponse = jest.fn(() => {
    const response = {
        data: {},
        statusCode: 200
    }
    return {
        send: (status,json) => {
            console.log("status", status, "json", json)
            if (!json) {
                json = status
                status = 200
            }
            response.data = json
            response.statusCode = status
            console.log("response", response)
        },
        json: () => {
            console.log("json response", response)
            return response.data
        },
        status: () => response.statusCode
    }
})
jest.mock('../service/member');
const {Login} = require('../service/member')

Login.mockImplementation(() => Promise.resolve({
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    expiredAt: 1536944575901,
    issuedAt: 1536944515901,
}))

describe('LoginHandler', () => {
    it('Input E-mail: golf.apipol@gmail.com Password:123456789 Should Be generate new token', () => {
        expectedResponse = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            expiredAt: 1536944575901,
            issuedAt: 1536944515901,
        }
        jsonData = {
            email: "golf.apipol@gmail.com",
            password: "123456789"
        }

        const request = {
            body: jsonData
        }
        const response = mockResponse()
        return LoginHandler(request, response,() => {})
            .then(() => {
                expect(response.json()).toEqual(expectedResponse)
                expect(response.status()).toEqual(expectedStatus)
            })
    });
});