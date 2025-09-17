
# 🌐 **Concept 2: IP Address & DNS (in Node.js)**

---

### 📖 What is it?

* **IP Address** = Unique identifier of a machine on the internet (e.g., `172.217.160.142`)
* **DNS (Domain Name System)** = Maps human-readable domain names (e.g., `google.com`) to IP addresses

So when you visit `google.com`, your computer actually resolves it to an IP like `142.250.72.206` before sending a request.

---

## 🛠️ What We'll Build (in Node.js)

We'll create a small script that:

1. Takes a **domain name** (like `google.com`)
2. Uses Node’s built-in `dns` module to resolve it
3. Logs the IP address and related info

---

## 📁 File: `resolve-dns.js`

```js
// resolve-dns.js
const dns = require('dns');
const readline = require('readline');

// Interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask user to input a domain
rl.question('Enter a domain name (e.g. google.com): ', function (domain) {
    // 1. Resolve IP address
    dns.lookup(domain, (err, address, family) => {
        if (err) {
            console.error('DNS lookup failed:', err.message);
        } else {
            console.log(`\n[DNS Lookup]`);
            console.log(`Domain: ${domain}`);
            console.log(`IP Address: ${address}`);
            console.log(`IP Version: IPv${family}`);
        }
    });

    // 2. Get all A records (if any)
    dns.resolve4(domain, (err, addresses) => {
        if (err) {
            console.error('Error resolving A records:', err.message);
        } else {
            console.log(`\n[A Records]`);
            addresses.forEach((addr, i) => {
                console.log(`IPv4 Address ${i + 1}: ${addr}`);
            });
        }
    });

    // 3. Get CNAME (Canonical Name) records (if any)
    dns.resolveCname(domain, (err, cnames) => {
        if (!err && cnames.length > 0) {
            console.log(`\n[CNAME Records]`);
            cnames.forEach((cname, i) => {
                console.log(`CNAME ${i + 1}: ${cname}`);
            });
        }
    });

    rl.close();
});
```

---

## ✅ How to Run

```bash
node resolve-dns.js
```

🧑‍💻 Example output:

```
Enter a domain name (e.g. google.com): openai.com

[DNS Lookup]
Domain: openai.com
IP Address: 104.18.12.154
IP Version: IPv4

[A Records]
IPv4 Address 1: 104.18.12.154
IPv4 Address 2: 104.18.13.154
```

---

### 💡 Explanation of DNS Functions

| Function             | Purpose                                          |
| -------------------- | ------------------------------------------------ |
| `dns.lookup()`       | Gets a single IP address (default OS resolution) |
| `dns.resolve4()`     | Gets all **A records** (IPv4 addresses)          |
| `dns.resolveCname()` | Gets **canonical name** (alias) records          |

---

### 🧠 Why This Matters for System Design

* DNS resolution introduces latency (\~20-100ms)
* Services often **cache DNS** to avoid repeat lookups
* Large apps may use **custom DNS or internal DNS resolvers**
* Failures in DNS can **break entire systems**

---
