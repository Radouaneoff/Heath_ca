const pool = require("./connection");

async function List_appointment (req,res){
    
    const { healthTopic, appointmentDay } = req.body;

    if(req.cookies.isAdmin!==undefined){
        try {
            const result = await pool.query(
                'SELECT * FROM appointment',
            );
            res.render('adminNavigation/ListOfAll',{data:result.rows});
        }
        catch(error){
        }
    }else{
        if(req.cookies.isUser!==undefined){
            try {
                const result = await pool.query(
                    'SELECT * FROM appointments WHERE health_topic = $1 AND appointment_day = $2',
                    [healthTopic, appointmentDay]
                );
                res.send({data:result.rows});
                }
                catch(error){
                    
                }
        }else{
            res.redirect('/login');
        }
    }
}

module.exports = List_appointment;