const MemberService = require('./member')

const stubMemberRepository = {
    create: jest.fn()
        .mockImplementationOnce((email, password, fullname, phone) => 
            Promise.resolve({
                email, fullname, phone
            }))
        .mockImplementationOnce(() => Promise.reject("user already taken")),
    findByEmail: jest.fn()
        .mockImplementationOnce((email) => Promise.resolve({email: email, password: "123456789"}))
        .mockImplementationOnce((email) => Promise.resolve({email: email, password: "123456789"}))
        .mockImplementation(() => Promise.resolve(undefined))
    
}

const MemberServiceWithStub = MemberService(stubMemberRepository)

describe('Member Service', () => {
    describe('Register', () => {
        it('Register account of golf.apipol@gmail.com should be created and response account information back', () => {
            const expected = {
                "email": "golf.apipol@gmail.com",
                "fullname": "Apipol Sukgler",
                "phone": "0853872788"
            }
            const input = {
                "email": "golf.apipol@gmail.com",
                "password": "123456789",
                "fullname": "Apipol Sukgler",
                "phone": "0853872788"
            }
            
            return MemberServiceWithStub.register(input)
                .then(({email, fullname, phone}) => {
                    expect({email, fullname, phone}).toEqual(expected)
                })
        });

        it('Register existed account of golf.apipol@gmail.com should be user already taken', () => {
            const expected = "user already taken"
            const input = {
                "email": "golf.apipol@gmail.com",
                "password": "123456789",
                "fullname": "Apipol Sukgler",
                "phone": "0853872788"
            }
            
            return MemberServiceWithStub.register(input)
                .catch((message) => {
                    expect(message).toEqual(expected)
                })
        });
    });

    describe('Login', () => {
        it('Login with existed account of golf.apipol@gmail.com should be generated token', () => {
            const input = {
                "email": "golf.apipol@gmail.com",
                "password": "123456789",
            }
            const {email, password} = input
            
            return MemberServiceWithStub.login(email, password)
                .then((response) => {
                    expect(response.token).toBeDefined()
                    expect(response.issuedAt).toBeDefined()
                    expect(response.expiredAt).toBeDefined()
                })
        });

        it('Login with existed account of golf.apipol@gmail.com but wrong password should be error invalid username, password', () => {
            const expected = "invalid username, password"
            const input = {
                "email": "golf.apipol@gmail.com",
                "password": "12345",
            }
            const {email, password} = input
            
            return MemberServiceWithStub.login(email, password)
                .catch((message) => {
                    expect(message).toEqual(expected)
                })
        });

        it('Login with unknown account should be error invalid username, password', () => {
            const expected = "invalid username, password"
            const input = {
                "email": "getlinks-staff@gmail.com",
                "password": "123456789",
            }
            const {email, password} = input
            
            return MemberServiceWithStub.login(email, password)
                .catch((message) => {
                    expect(message).toEqual(expected)
                })
        });
    });
});