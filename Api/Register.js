const pool = require("./connection");
const Rand_gen = require("./generate");

async function Register (req,res){
    const {fullname, email, password, phone ,gender} = req.body;
    if(fullname ==undefined || email ==undefined || password==undefined ||phone ==undefined){
        res.render('register', { error: true });
    }else{
        try {
            
            await pool.query('SELECT insert_malade($1, $2, $3, $4, $5, $6)', [Rand_gen(), fullname, email, password, phone, gender]);
            res.render('login', {error:false});
        } catch (err) {
            console.log(err);
            res.render('register', { error: true });
            }
    }
}

module.exports =Register;