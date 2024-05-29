const express = require('express');
const path = require('path');
const Register = require('./Api/Register');
const bodyParser = require('body-parser');
const app = express();

const port = parseInt(process.env.PORT) || process.argv[3] || 3000;

app.use(express.static(path.join(__dirname, 'public')))

  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('admin');
});
app.get('/login', (req, res) => {
  res.render('login');
});


app.get('/news', (req, res) => {
  res.render('news');
});
app.get('/register', (req, res) => {
  res.render('register', { error: false });
});

app.post("/register",(req, res)=>{
  Register(req,res);
});



app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})