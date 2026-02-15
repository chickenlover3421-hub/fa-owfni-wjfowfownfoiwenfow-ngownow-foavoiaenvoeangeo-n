const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Your 10 proxies (Gmail 1 credentials – change if needed)
const proxies = [
  { ip: '216.10.27.159', port: 6837, username: 'idsbktim', password: '78rw1aotcwe6', country: 'USA', city: 'Dallas' },
  { ip: '198.105.121.200', port: 6462, username: 'idsbktim', password: '78rw1aotcwe6', country: 'UK', city: 'London' },
  { ip: '198.23.239.134', port: 6540, username: 'idsbktim', password: '78rw1aotcwe6', country: 'USA', city: 'Buffalo' },
  { ip: '107.172.163.27', port: 6543, username: 'idsbktim', password: '78rw1aotcwe6', country: 'USA', city: 'Bloomingdale' },
  { ip: '64.137.96.74', port: 6641, username: 'idsbktim', password: '78rw1aotcwe6', country: 'Spain', city: 'Madrid' },
  { ip: '45.38.107.97', port: 6014, username: 'idsbktim', password: '78rw1aotcwe6', country: 'UK', city: 'London' },
  { ip: '31.59.20.176', port: 6754, username: 'idsbktim', password: '78rw1aotcwe6', country: 'UK', city: 'London' },
  { ip: '23.229.19.94', port: 8689, username: 'idsbktim', password: '78rw1aotcwe6', country: 'USA', city: 'Los Angeles' },
  { ip: '23.95.150.145', port: 6114, username: 'idsbktim', password: '78rw1aotcwe6', country: 'USA', city: 'Buffalo' },
  { ip: '23.26.71.145', port: 5628, username: 'idsbktim', password: '78rw1aotcwe6', country: 'USA', city: 'Orem' }
];

app.get('/proxies', (req, res) => {
  res.json(proxies.map(p => ({ country: p.country, city: p.city, ip: p.ip, port: p.port })));
});

app.get('/fetch', async (req, res) => {
  const { url, proxyIndex } = req.query;
  if (!url || proxyIndex === undefined) return res.status(400).send('Missing url or proxyIndex');

  const proxy = proxies[proxyIndex];
  try {
    const response = await axios.get(url, {
      proxy: {
        host: proxy.ip,
        port: proxy.port,
        auth: { username: proxy.username, password: proxy.password }
      },
      timeout: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    res.send(response.data);
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Proxy backend running'));
