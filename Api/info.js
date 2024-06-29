const pool = require("./connection");

async function Info(req,res){
  const check = (req.cookies.userId === undefined)
  const data = await pool.query('SELECT * FROM clinics')
  const days = await pool.query('SELECT * FROM clinic_hours')
  res.render('index', {check:check, data:data.rows[0], days:days.rows});
}

module.exports = Info