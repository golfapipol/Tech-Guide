'use strict';

let ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

const express = require('express')
const app = express()

app.get("*", (req, res) => {
    res.sendfile('./public/index.html');
});

const server = app.listen(PORT, () => {
    const {address, port} = server.address();
    console.log(`Github Followers Finder listening at http://${address}:${port}`)
});