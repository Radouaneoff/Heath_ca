const pool = require("./connection");
const Rand_gen = require("./generate");

async function Appointment(req, res) {
    const { healthTopic, appointmentDay, message } = req.body;
    
    if (!healthTopic || !appointmentDay) {
        res.render('make_appointment', { error: true, errormsg: "Some fields are empty." });
        return;
    }

    try {
        const availableDoctorsResult = await pool.query(
            "SELECT * FROM doctors WHERE health_category = $1 AND available = 't'",
            [healthTopic]
        );
        const availableDoctors = availableDoctorsResult.rows;

        if (availableDoctors.length === 0) {
            res.render('make_appointment', { error: true, state:false ,errormsg: "No doctors available right now, please try later." });
            return;
        }

        const doctorId = availableDoctors[0].id;
        const appointmentResult = await pool.query(
            'SELECT * FROM appointment WHERE health_category = $1 AND date_appointment = $2',
            [healthTopic, appointmentDay]
        );
        const Check = await pool.query(
            'SELECT * FROM appointment WHERE health_category = $1 AND date_appointment = $2 AND id_malade = $3',
            [healthTopic, appointmentDay, req.cookies.userId]
        );

        if ((appointmentResult.rows.length >= 20) ) {
            res.render('make_appointment', { error: true, state:false ,errormsg: "Appointment on this day is not available, please choose another day." });
            return;
        }
        if((Check.rows.length >0)  ){
            res.render('make_appointment', { error: true, state:false ,errormsg: "Sorry you're alredy set this day." });
            return;
        }
        await pool.query(`
            INSERT INTO appointment (id_random, id_doctor, id_malade, health_category, date_appointment, message) 
            VALUES ($1, $2, $3, $4, $5, $6)
        `, [Rand_gen(), doctorId, req.cookies.userId, healthTopic, appointmentDay, message]);

        res.render('make_appointment', { error: true, state:true, succesmsg:'Appointment in this day are successfuly add it.' });

    } catch (err) {
        console.error(err);
        res.render('make_appointment', { error: true,state:false , errormsg: "Something went wrong, please try again." });
    }
}

module.exports = Appointment;
