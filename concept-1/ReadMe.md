
## ✅ **System Design Concepts with Node.js & Express**

**Part 1: Foundational Networking & Web Concepts** using **Node.js and Express**.

---

### 📚 Part 1 Topics

| Step | Concept                      | What We’ll Build                                           |
| ---- | ---------------------------- | ---------------------------------------------------------- |
| 1    | ✅ Client-Server Architecture | Express server + Node HTTP client                          |
| 2    | IP Address & DNS             | Use `dns` module to resolve domain names                   |
| 3    | Proxy vs Reverse Proxy       | Simulate proxy & reverse proxy with Express and middleware |
| 4    | Latency & Data Centers       | Use `ping`, traceroute, and simulate geo-distribution      |
| 5    | HTTP vs HTTPS                | Set up both HTTP and HTTPS servers in Node                 |

---

## **1. Client-Server Architecture (Node + Express)**

### 🧠 Concept Recap:

* **Client** sends request
* **Server** responds
* Communication over HTTP

---

### 📂 Project Structure

```
part1-client-server/
├── client.js       <-- Node.js client (sends HTTP requests)
└── server.js       <-- Express server (responds to requests)
```

---

### 🛠️ Step 1: Set Up Your Environment

```bash
mkdir part1-client-server
cd part1-client-server
npm init -y
npm install express
```

---

### 📄 server.js – Basic Express Server

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/hello', (req, res) => {
    res.send('Hello from Express server!');
});

app.get('/welcome', (req, res) => {
    const name = req.query.name || 'Guest';
    res.send(`Welcome, ${name}!`);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

---

### 📄 client.js – Node.js HTTP Client

```js
const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/hello',
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
```

---

### 🧪 How to Run

1. Start the server:

```bash
node server.js
```

You should see:

```
Server running on http://localhost:3000
```

2. Open a second terminal and run the client:

```bash
node client.js
```

You should see:

```
Status Code: 200
Response from server: Hello from Express server!
```

---
