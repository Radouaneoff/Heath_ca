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
            console.log(error);
        }
    }else{
        if(req.cookies.isUser!==undefined){
            try {
                
                if(healthTopic === undefined || appointmentDay === undefined)
                    {
                        const result = await pool.query(
                            'SELECT * FROM appointment WHERE  id_malade = $1',
                            [req.cookies.userId]
                        );
                        res.render('MaladeNavigation/MyList',{data:result.rows});
                    }else{
                        Search(healthTopic, appointmentDay)
                    }
                }
                catch(error){
                    console.log(error);
                }
        }else if(req.cookies.doctorId){
            try {
                const malade = pool.query('SELECT * FROM malade where id_doctor = $1',[req.cookies.doctorId])
                res.render('DoctorNavigation', {data:malade})
            } catch (error) {
                console.log(error);
            }
        }else{

            res.redirect('/login');
        }
    }
}

async function Search(healthTopic, appointmentDay){
    try{
        const result = await pool.query(
        'SELECT * FROM appointment WHERE health_category = $1 AND date_appointment = $2',
        [healthTopic, appointmentDay]
    );
    res.render('MaladeNavigation/MyList',{data:result.rows});
    }
    catch(error){
        console.log(error);
}
}

module.exports = List_appointment;