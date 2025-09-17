// client.js
const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/hello', // try '/welcome?name=YourName'
    method: 'GET',
};

const req = http.request(options, (res) => {
    let data = '';

    console.log(`Status Code: ${res.statusCode}`);

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(`Response from server: ${data}`);
    });
});

req.on('error', (error) => {
    console.error(`Problem with request: ${error.message}`);
});

req.end();
