const express = require('express');
const path = require('path');
const Register = require('./Api/Register');
const bodyParser = require('body-parser');
const Login = require('./Api/login');
const cookieParser = require('cookie-parser');
const Appointment = require('./Api/appointment');
const List_appointment = require('./Api/list_appointment');
const AddDoctor = require('./Api/AddDoctor');
const ListDoctors = require('./Api/List_doctors');
const deleteUser = require('./Api/DeleteUser');
const app = express();
app.use(cookieParser());
const port = parseInt(process.env.PORT) || process.argv[3] || 3000;

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'views/AdminNavigation')))
app.use(express.static(path.join(__dirname, 'views/DoctorsNavigation')))
app.use(express.static(path.join(__dirname, 'views/MaladeNavigation')))

  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  

app.get('/', (req, res) => {
  const check = (req.cookies.userId === undefined)
  res.render('index', {check:check});
});

app.get('/home', (req, res) => {
  List_appointment(req,res);
});

app.get('/register', (req, res) => {
  res.render('register', { error: false });
});


app.get('/login', (req, res) => {
  res.render('login', {error:false});
});
app.get('/appointment', (req, res) => {
  if(req.cookies.userId !==undefined){

    if(req.cookies.isAdmin ===undefined)
      res.render('MaladeNavigation/make_appointment', {error:false});
    else
      res.redirect('/home');
  }else{
    res.redirect('/home');
  }

});

app.get('/logout', (req, res) => {
  res.clearCookie('isAdmin');
  res.clearCookie('isUser');
  res.clearCookie('userId');
  res.clearCookie('doctorId');
  res.redirect('/login');
});

app.get('/news', (req, res) => {
  res.render('news');
});
app.get('/home/appointment', (req, res) => {

  const isAdmin = req.cookies.isAdmin;
  const userId = req.cookies.userId;
  if(userId === undefined)
    {
      res.redirect('login');
    }else{
    if (isAdmin === undefined) {
        res.render('maladeNavigation/make_appointment', {error:false});
    } else {
        res.redirect('/home');
    }
    }
});

app.get('/learn-more/:id', (req, res) => {
  const id = req.params.id;
  res.render(`learn-more${id}`);
});





// -----------POST METHODES-----------------
app.post("/register",(req, res)=>{
  Register(req,res);
});

app.post("/login",(req, res)=>{
  Login(req,res);
});

app.post("/appointment",(req, res)=>{

  if(req.cookies.userId !==undefined)
    {

      Appointment(req,res)
    }else{
      res.redirect('/home')
    }
});

app.post("/home",(req, res)=>{
  
  List_appointment(req,res)
});
app.post("/addDoctor",(req, res)=>{
  
  const admin = req.cookies.isAdmin;
  
  if(admin !==undefined){
    AddDoctor(req,res)
  }else{
    res.redirect('/home')
  }
});
app.get("/delete/:id",(req, res)=>{
  deleteUser(req,res)
});

// Admin Navigation 

app.get('/home/doctors',(req,res)=>{
  ListDoctors(req,res);
})
app.post('/home/doctors',(req,res)=>{
  ListDoctors(req,res);
})

app.get('/home/add-doctors',(req,res)=>{
  const isAdmin = req.cookies.isAdmin;
  
  if(isAdmin !==undefined){
    res.render('adminNavigation/addDoctor', { error:false});
  }else{
    res.redirect('/login');
  }
})

app.get('/home/add-category',(req,res)=>{
  const isAdmin = req.cookies.isAdmin;
  
  if(isAdmin !==undefined){
    res.render('adminNavigation/addCategory', { error:false});
  }else{
      res.redirect('/login');
  }
})

app.get('/home/edit-clinic',(req,res)=>{
  const isAdmin = req.cookies.isAdmin;
  
  if(isAdmin !==undefined){
    res.render('adminNavigation/edit', { role:true});
  }else{
      res.redirect('/login');
  }
})


// list of appointment


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})
