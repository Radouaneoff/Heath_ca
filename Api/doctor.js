const pool = require("./connection");

async function DoctorAuth(req, res) {
    const { email, password } = req.body;

    try {
        if(email !== undefined || password !==undefined){

            const result = await pool.query('SELECT * FROM doctors where username = $1 and password = $2', [email, password]);
            const user = result.rows[0];
            if(result.rows.length>0){
                res.cookie('isAdmin', false, { httpOnly: true, maxAge: 900000 });
                res.cookie('doctorId', user.id, { httpOnly: true, maxAge: 900000 });
                res.redirect('/home');
            }else{

                res.render('Login', { error: true });
            }
        }else{
            res.render('Login', { error: true });
        }
        
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = DoctorAuth;
