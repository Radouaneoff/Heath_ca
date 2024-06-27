const pool = require("./connection");

async function deleteUser(req,res){

    const isAdmin = req.cookies.isAdmin

    if(isAdmin){
        try {
            await pool.query('delete from doctors where id_random = $1', [req.params.id])
            res.redirect('/home/Doctors');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = deleteUser

