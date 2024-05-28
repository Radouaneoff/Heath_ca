const express = require('express');
const path = require('path')

const app = express();

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use(express.static(path.join(__dirname, 'public')))

  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/news', (req, res) => {
  res.render('news');
});
app.get('/register', (req, res) => {
  res.render('register');
});


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})