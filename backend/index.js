const PORT = process.env.PORT || 3000

const restify = require('restify');
const { Client } = require('pg')


const postgres = new Client()
postgres.connect()

const MemberRepository = require('./db/member')(postgres)
const MemberService = require('./service/member')(MemberRepository)

const RegisterHandler = require('./api/register')(MemberService)
const LoginHandler = require('./api/login')(MemberService)

const app = restify.createServer();

app.use(restify.plugins.jsonBodyParser({ mapParams: true }));
app.use(restify.plugins.queryParser({ mapParams: true }));

app.post('/api/v1/members/register', RegisterHandler)
app.post('/api/v1/members/login', LoginHandler)
app.get('/api/v1/hello', (request, response, next) => {
    response.send("hello")
    return next()
})

app.listen(PORT, () => {  
    console.log('%s listening at %s', app.name, app.url);
});
