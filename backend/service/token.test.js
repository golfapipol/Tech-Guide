const TokenService = require('./token')

describe('TokenService', () => {
    it('Generate Token Should Be Token with IssuedTime and ExpiredTime ', () => {
        const output = TokenService.generate({})
        expect(output.token).toBeDefined()
        expect(output.issuedAt).toBeDefined()
        expect(output.expiredAt).toBeDefined()
    });    
});