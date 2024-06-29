const pool = require("./connection");

async function ListDoctors(req,res){

    const isAdmin = req.cookies.isAdmin;
    const search = req.body.search;
    console.log(search);
    if(isAdmin){

        try {
            if(search === undefined){
                const data = await pool.query('SELECT * from doctors ');
                res.render('DoctorList', {data:data.rows});
                console.log("main");
            }else{
                const sql = "SELECT * FROM doctors WHERE fullname like '%"+search+"%'"
                console.log(sql);
                const data = await pool.query(sql);
                res.render('DoctorList', {data:data.rows});

            }

        } catch (error) {
            console.log(error);
        }

    }else{
        res.redirect('/home');
    }

}

module.exports = ListDoctors