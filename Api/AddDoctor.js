const pool = require("./connection");
const Rand_gen = require("./generate");

async function AddDoctor(req,res){

    const {fullname, phone, date, category, username, password, gender} = req.body;
    console.log(req.body);
    console.log(fullname);
    if(fullname !== '' && phone !== '' && gender !== '' && date !== '' && category !== '' && username !== '' && password !== '' ){
        try {
            
            pool.query('insert into doctors (id_random , fullname , username , password , phone , gender , health_category , available, date) values($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
                [Rand_gen(), fullname, username, password, phone, gender,  category , true, date])

            res.render('adminNavigation/addDoctor',{error:true, state:true, succesmsg:`The doctors ${fullname} add successfully.`});

        } catch (error) {
            res.render('adminNavigation/addDoctor',{error:true,state:false, errormsg:'Something went worng, please try again.'});
            console.log(error);

        }
    }else{
        res.render('adminNavigation/addDoctor',{error:true, state:false,errormsg:'Some field are required.'});
    }

}


module.exports = AddDoctor