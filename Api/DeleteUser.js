const pool = require("./connection");

async function deleteUser(req,res){

    const isAdmin = req.cookies.isAdmin
    const userId = req.cookies.userId
    console.log(req.params.id);
    if(isAdmin){
        try {
            await pool.query('delete from doctors where id_random = $1', [req.params.id])
            await pool.query('delete from appointment where id_random = $1', [req.params.id])
            res.redirect('/home');
        } catch (error) {
            console.log(error);
        }
    }else{
        if(userId !== undefined){
            try {
                await pool.query('delete from appointment where id_random = $1 and id_malade = $2', [req.params.id, userId])
                res.redirect('/home');
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = deleteUser

