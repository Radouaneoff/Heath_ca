const pool = require("./connection");
const Rand_gen = require("./generate");

async function Register (req,res){
    const {fullname, email, password, phone} = req.body;
    if(fullname ==undefined || email ==undefined || password==undefined ||phone ==undefined){
        res.render('register', { error: true });
    }else{

        try {
            await pool.query('INSERT INTO users (id_random, fullname, email, password, phone) VALUES ($1, $2, $3, $4, $5)', [Rand_gen(), fullname, email, password, phone]);
        res.render('login');
            
        } catch (err) {
            console.log(err);
            res.render('register', { error: true });
            }
    }
}

module.exports =Register;