const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // Allow frontend to access the API

app.get('/scrape', async (req, res) => {
    const targetUrl = 'https://qrcoin.fun'; // Change to the real URL
    const selector = '.truncate'; // Change to the element you want to scrape

    try {
        const { data } = await axios.get(targetUrl);
        const $ = cheerio.load(data);
        const scrapedData = $(selector).text().trim();

        res.json({ data: scrapedData || 'No data found' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch or parse data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
