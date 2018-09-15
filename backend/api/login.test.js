const LoginHandler = require("./login")

const mockResponse = jest.fn(() => {
    const response = {
        data: {},
        statusCode: 200
    }
    return {
        send: (status,json) => {
            response.data = {}
            response.statusCode
            if (!json) {
                json = status
                status = 200
            }
            response.data = json
            response.statusCode = status
        },
        json: () => {
            return response.data
        },
        status: () => response.statusCode
    }
})
jest.mock('../service/member', () => ({
    login: jest.fn().mockImplementationOnce(() => Promise.resolve({
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            expiredAt: 1536944575901,
            issuedAt: 1536944515901,
        }))
        .mockImplementationOnce(() => Promise.reject("invalid username, password"))   
}));
const MemberService = require('../service/member')
const LoginHandlerWithStubservice = LoginHandler(MemberService)

describe('LoginHandler', () => {
    describe('Login Success', () => {
        it('Input E-mail: golf.apipol@gmail.com Password:123456789 Should Be generate new token', () => {
            expectedResponse = {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
                expiredAt: 1536944575901,
                issuedAt: 1536944515901,
            }
            expectedStatus = 200
            jsonData = {
                email: "golf.apipol@gmail.com",
                password: "123456789"
            }
    
            const request = {
                body: jsonData
            }
            const response = mockResponse()
            return LoginHandlerWithStubservice(request, response,() => {})
                .then(() => {
                    expect(response.json()).toEqual(expectedResponse)
                    expect(response.status()).toEqual(expectedStatus)
                })
        });    
    });

    describe('Login Failure', () => {
        it('Input E-mail: golf.apipol@gmail.com Password:<empty> Should Be generate new token', () => {
            expectedResponse = { response: "please input email and password" }
            expectedStatus = 400
            jsonData = {
                email: "golf.apipol@gmail.com",
                password: ""
            }
    
            const request = {
                body: jsonData
            }
            const response = mockResponse()
            return LoginHandlerWithStubservice(request, response,() => {})
                .then(() => {
                    expect(response.json()).toEqual(expectedResponse)
                    expect(response.status()).toEqual(expectedStatus)
                })
        });
        it('Input E-mail: golf.apipol@gmail.com Password:1 Should Be invalid username,password', () => {
            expectedResponse = { response: "invalid username, password" }
            expectedStatus = 400
            jsonData = {
                email: "golf.apipol@gmail.com",
                password: "1"
            }
    
            const request = {
                body: jsonData
            }
            const response = mockResponse()
            
            return LoginHandlerWithStubservice(request, response,() => {})
                .then(() => {
                    expect(response.json()).toEqual(expectedResponse)
                    expect(response.status()).toEqual(expectedStatus)
                })
        });
    });
    
});