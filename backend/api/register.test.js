const RegisterHandler = require("./register")

const mockResponse = jest.fn(() => {
    const response = {
        data: {},
        statusCode: 200
    }
    return {
        send: (status,json) => {
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
    register: jest.fn().mockImplementationOnce(() => Promise.resolve({
        email: "golf.apipol@gmail.com",
        fullname: "Apipol Sukgler",
        phone: "0853872788"
    }))
    .mockImplementationOnce(() => Promise.reject("user already taken"))   
}));
const MemberService = require('../service/member')
const RegisterHandlerWithStubservice = RegisterHandler(MemberService)

describe('RegisterHandler', () => {
    describe('Register Success', () => {
        it('Input E-mail: golf.apipol@gmail.com Password:123456789 Should Be generate new token', () => {
            expectedResponse = {
                email: "golf.apipol@gmail.com",
                fullname: "Apipol Sukgler",
                phone: "0853872788"
            }
            expectedStatus = 200
            jsonData = {
                "email": "golf.apipol@gmail.com",
                "password": "123456789",
                "fullname": "Apipol Sukgler",
                "phone": "0853872788"
            }
    
            const request = {
                body: jsonData
            }
            const response = mockResponse()
            return RegisterHandlerWithStubservice(request, response,() => {})
                .then(() => {
                    expect(response.json()).toEqual(expectedResponse)
                    expect(response.status()).toEqual(expectedStatus)
                })
        });
    });

    describe('Register Fail', () => {
        it('Input Existed E-mail: golf.apipol@gmail.com Password:123456789 Should Be error user already taken', () => {
            expectedResponse = { response: "user already taken" }
            expectedStatus = 400
            jsonData = {
                "email": "golf.apipol@gmail.com",
                "password": "123456789",
                "fullname": "Apipol Sukgler",
                "phone": "0853872788"
            }
    
            const request = {
                body: jsonData
            }
            const response = mockResponse()
            return RegisterHandlerWithStubservice(request, response,() => {})
                .then(() => {
                    expect(response.json()).toEqual(expectedResponse)
                    expect(response.status()).toEqual(expectedStatus)
                })
        });

        it('Input not enough Should Be BadRequest', () => {
            expectedResponse = { response: "please input email, password, fullname and phone" }
            expectedStatus = 400
            jsonData = {
                "email": "golf.apipol@gmail.com",
                "password": "123456789",
                "fullname": "Apipol Sukgler"
            }
    
            const request = {
                body: jsonData
            }
            const response = mockResponse()
            return RegisterHandlerWithStubservice(request, response,() => {})
                .then(() => {
                    expect(response.json()).toEqual(expectedResponse)
                    expect(response.status()).toEqual(expectedStatus)
                })
        });
    });
    
});