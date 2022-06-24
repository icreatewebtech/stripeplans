require('dotenv').config();
const http = require('http');
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

const app = require('./config/app');

const server = http.createServer(app);

server.listen(port,host, () => {
    console.log('------------------------------------------------------------------------------');
    console.log(`http://${host}:${port}/`);
    console.log('------------------------------------------------------------------------------');
});