const pool = require("./connection");

async function EditAdmin(req, res) {
  try {
    const { phone, email, appointmentDayOpen, starthoursopen, endhoursopen, starthoursclose, endhoursclose } = req.body;

    if ((!phone || !email) && (!appointmentDayOpen  || !starthoursopen || !endhoursopen)) {
      return    res.render('adminNavigation/edit', { error:true ,state:false , message:"Some field are empty"});
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)&&(!appointmentDayOpen  || !starthoursopen || !endhoursopen)) {
        return    res.render('adminNavigation/edit', { error:true ,state:false , message:"Invalid email format"});
    }
    
    if (starthoursopen < 0 || starthoursopen > 24 || endhoursopen < 0 || endhoursopen > 24 || starthoursclose < 0 || starthoursclose > 24 || endhoursclose < 0 || endhoursclose > 24) {
        
        return    res.render('adminNavigation/edit', { error:true ,state:false , message:"Invalid hours. Must be between 0 and 24"});
    }

    const query1 = `
      UPDATE clinics
      SET phone = $1,
          email = $2
      WHERE id = 1;
    `;
    const query2 = `
      UPDATE clinic_hours
      SET start_hour  = $1,
      end_hour = $2
      WHERE day_of_week  = $3;
    `;


    const values = [phone, email];
    if(phone && email){
        const result = await pool.query(query1, values);
        if (result.rowCount === 0) {
            return    res.render('adminNavigation/edit', { error:true ,state:false , message:"something wrong happing, please try again."});
        }
    }
    if (appointmentDayOpen  && starthoursopen && endhoursopen){

        const result1 = await pool.query(query2, [starthoursopen, endhoursopen, appointmentDayOpen]);
        if (result1.rowCount === 0) {
            return    res.render('adminNavigation/edit', { error:true ,state:false , message:"something wrong happing, please try again."});
        }
    }

    
    return    res.render('adminNavigation/edit', { error:true ,state:true , message:"Clinic information updated successfully"});
} catch (error) {
    console.log(error);
    return    res.render('adminNavigation/edit', { error:true ,state:false , message:"something went wrong , please try again."});
  }
}

module.exports = EditAdmin;
