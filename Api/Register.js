const pool = require("./connection");

async function Register (req,res){
    const {fullname, email, password, phone} = req.body;
    if(fullname ==undefined || email ==undefined || password==undefined ||phone ==undefined){
        res.render('register', { error: true });
    }else{

        try {
            await pool.query('INSERT INTO users (fullname, email, password, phone) VALUES ($1, $2, $3, $4)', [fullname, email, password, phone]);
            res.send('User information saved successfully!');
        } catch (err) {
            console.log(err);
            res.render('register', { error: true });
            }
    }
}

module.exports =Register;