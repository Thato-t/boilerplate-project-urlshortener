require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true}))
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

let urlDatabase = {};
let counter = 1;

const urlRegex = /^(https?:\/\/)(www\.)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;

app.post('/api/shorturl', (req, res) => {
  const originalUrl = req.body.url;

  // 🔎 Validate using regex
  if (!urlRegex.test(originalUrl)) {
    return res.json({ error: 'invalid url' });
  }

  // 💾 Store valid URL and generate short version
  const shortUrl = counter++;
  urlDatabase[shortUrl] = originalUrl;

  res.json({
    original_url: originalUrl,
    short_url: shortUrl
  });
});

app.get('/api/shorturl/:short', (req, res) => {
  const short = req.params.short;
  const original = urlDatabase[short]
    res.redirect(original);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
