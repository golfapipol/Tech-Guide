const restify = require('restify');
const app = restify.createServer();

app.listen(8080, () => {  
    console.log('%s listening at %s', app.name, app.url);
});
