const pool = require("./connection");
const Rand_gen = require("./generate");

async function Appointment (req,res){
    const { healthTopic, appointmentDay, message } = req.body;
    console.log(healthTopic);
    if(healthTopic === undefined || appointmentDay === undefined){
        console.log("awd");
        res.render('maladeNavigation/make_appointment', { error: true , errormsg:"some filed are empty" });
    }else{
        try {
            const available_doctors = await pool.query(
                "SELECT * FROM doctors WHERE health_category = $1 and available = 't'",
                [healthTopic]
            );
            if(available_doctors.rows.length>0){
            const id_doc = available_doctors.rows[0].id;
            const result = await pool.query(
                'SELECT * FROM appointment WHERE health_category = $1 AND date_appointment = $2',
                [healthTopic, appointmentDay]
            );
            if (result.rows.length < 1) {
                await pool.query('SELECT make_appointment ($1, $2, $3, $4, $5, $6)', [Rand_gen(),id_doc, req.cookies.idUser, healthTopic, appointmentDay, message]);
                res.render('maladeNavigation/make_appointment', { error: false});  
            }
            else{
                res.render('maladeNavigation/make_appointment', { error: true , errormsg:"Appointment on this day is not available, please choose another day." });
        }
             }
             else{
                res.render('maladeNavigation/make_appointment', { error: true , errormsg:"we are sorry there isn't any  doctors available right now, please try later" });
             }

        } catch (err) {
            console.log(err);
            res.render('maladeNavigation/make_appointment', { error: true , errormsg:"Something went wrong, please try again"});
            }
    }
}

module.exports = Appointment;