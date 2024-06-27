const pool = require("./connection");
const DoctorAuth = require("./doctor");

async function Login(req, res) {
    const { email, password } = req.body;

    if (email === undefined || password === undefined) {
        res.render('Login', { error: true });
    } else {
        try {
            const result = await pool.query(
                'SELECT * FROM malade WHERE email = $1 AND password = $2',
                [email, password]
            );

            if (result.rows.length > 0) {
                const user = result.rows[0];
                if (user.isadmin) {
                res.cookie('isAdmin', user.isadmin, { httpOnly: true, maxAge: 900000 });
                res.cookie('userId', user.id, { httpOnly: true, maxAge: 900000 });
                res.redirect('/home');

                } else {
                res.cookie('isUser', !user.isadmin, { httpOnly: true, maxAge: 900000 });
                res.cookie('userId', user.id, { httpOnly: true, maxAge: 900000 });
                res.redirect('/home');
                }
            } else {
                
                DoctorAuth(req,res);
            }
        } catch (err) {
            console.log(err);
            res.render('Login', { error: true });
        }
    }
}

module.exports = Login;
