const pool = require("./connection");

async function Appointment (req,res){
    const { healthTopic, appointmentDay, message } = req.body;
    if(healthTopic ==undefined || appointmentDay ==undefined){
        res.render('make_appointment', { error: true , errormsg:"some filed are empty" });
    }else{
        try {
            const result = await pool.query(
                'SELECT * FROM appointments WHERE health_topic = $1 AND appointment_day = $2',
                [healthTopic, appointmentDay]
            );
            if (result.rows.length < 1) {
            await pool.query('INSERT INTO appointments (health_topic, appointment_day, message) VALUES ($1, $2, $3)', [healthTopic, appointmentDay, message]);
            res.send('User information saved successfully!');
            }else{
            res.render('make_appointment', { error: true , errormsg:"Appointment on this day is not available, please choose another day." });
            }
        } catch (err) {
            console.log(err);
            res.render('make_appointment', { error: true , errormsg:"some filed are empty"});
            }
    }
}

module.exports = Appointment;