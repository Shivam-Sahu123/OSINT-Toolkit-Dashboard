const express = require("express");
const cors = require("cors");
const whois = require("whois-json");
const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);

const dnsPromises = dns.promises;

const app = express();
app.use(cors());

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("OSINT Backend Running");
});


app.get("/whois", async (req, res) => {

    try {

        const domain = req.query.domain;

        const data = await whois(domain);

        res.json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

app.get("/dns", async (req, res) => {

    try {

        const domain = req.query.domain;

        const type = req.query.type || "A";

        const records = await dnsPromises.resolve(domain, type);

        res.json({
            domain: domain,
            records: records
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});