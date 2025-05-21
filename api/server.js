import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const targetUrl = 'https://qrcoin.fun'; // Change to the real URL
  const selector = '.truncate'; // Change to the correct selector

  try {
    const { data } = await axios.get(targetUrl);
    const $ = cheerio.load(data);
    const scrapedData = $(selector).text().trim();

    res.status(200).json({ data: scrapedData || 'No data found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch or parse data' });
  }
}
