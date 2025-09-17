const dns = require('dns');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a domain name (e.g. google.com): ', function (domain) {
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
