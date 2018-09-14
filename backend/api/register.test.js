const RegisterHandler = require("./register")

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
const {Register} = require('../service/member')

Register.mockImplementation(() => Promise.resolve({
    email: "golf.apipol@gmail.com",
    fullname: "Apipol Sukgler",
    phone: "0853872788"
}))

describe('LoginHandler', () => {
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
        return RegisterHandler(request, response,() => {})
            .then(() => {
                expect(response.json()).toEqual(expectedResponse)
                expect(response.status()).toEqual(expectedStatus)
            })
    });
});