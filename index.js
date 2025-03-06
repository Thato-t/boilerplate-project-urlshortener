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

let originalURI;
// Your first API endpoint
app.post('/api/shorturl', function(req, res) {
  originalURI = req.body.url
  const regex = /^https?:\/\/(www|forum)?.?[a-z]+.(org|co.za|edu.za|com)$/i
  let id = 1
  
  if(!regex.test(originalURI)){
    res.json({ error: 'invalid url'})
  } else{
    res.json({ 
      original_url: originalURI,
      short_url: id
    });
    id++
  }
});

app.get('/api/shorturl/:url?', (req, res) => {
  const uri = originalURI;
  res.redirect(uri)
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
