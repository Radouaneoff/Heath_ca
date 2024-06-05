const express = require('express');
const path = require('path');
const Register = require('./Api/Register');
const bodyParser = require('body-parser');
const Login = require('./Api/login');
const cookieParser = require('cookie-parser');
const Appointment = require('./Api/appointment');
const app = express();
app.use(cookieParser());
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
  const isAdmin = req.cookies.isAdmin;
  const isUser = req.cookies.isUser;
  const userId = req.cookies.userId;
  if(userId === undefined)
    {
      res.redirect('login');
    }else{

    if (isAdmin === undefined) {
        res.render('admin', { role:false});
    } else {
        res.render('admin', { role:true});
    }
    }
});

app.get('/login', (req, res) => {
  res.render('login', {error:false});
});
app.get('/logout', (req, res) => {
  res.clearCookie('isAdmin');
  res.clearCookie('isUser');
  res.clearCookie('userId');
  res.redirect('/login');
});



app.get('/news', (req, res) => {
  res.render('news');
});
app.get('/appointment', (req, res) => {

  const isAdmin = req.cookies.isAdmin;
  const isUser = req.cookies.isUser;
  const userId = req.cookies.userId;
  if(userId === undefined)
    {
      res.redirect('login');
    }else{

    if (isAdmin === undefined) {
        res.render('make_appointment', { role:false, error:false});
    } else {
        res.render('make_appointment', { role:true , error:false});
    }
    }

});

app.get('/register', (req, res) => {
  res.render('register', { error: false });
});

app.get('/learn-more/:id', (req, res) => {
  const id = req.params.id;
  res.render(`learn-more${id}`);
});



app.post("/register",(req, res)=>{
  Register(req,res);
});

app.post("/login",(req, res)=>{
  Login(req,res);
});

app.post("/appointment",(req, res)=>{
  Appointment(req,res)
});




app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})
