const pool = require("./connection");

async function ListDoctors(req,res){

    const isAdmin = req.cookies.isAdmin;
    const search = req.body.search;
    if(isAdmin){

        try {
            if(search === undefined){
                const data = await pool.query('SELECT * from doctors ');
                res.render('AdminNavigation/DoctorList', {data:data.rows});
                console.log("main");
            }else{
                console.log("e");
                const data = await pool.query('SELECT * from doctors  fullname  %$1%',[search]);
                res.render('AdminNavigation/DoctorList', {data:data.rows});

            }

        } catch (error) {
            console.log(error);
        }

    }else{
        res.redirect('/home');
    }

}

module.exports = ListDoctors