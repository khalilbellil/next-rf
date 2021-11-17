const db = require('../../../lib/db')
var md5 = require("md5")
const automail = require('../../../rf_toolbox/automail')

module.exports = async (req, res) => {
    let { role, email } = req.body
    var success = 'no'
    var token = ''
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    var random = Math.random();
    if(random != undefined && dateTime != undefined && email && role){
        token = md5(dateTime + 'zizou' + random)
        if(token != undefined){
            try {
                await db.query(`INSERT INTO user(role, token, username) VALUES('${role}', '${token}', '${email}')`)
                automail.sendEmailById(email, 2)
                success = 'yes'
            } catch (error) {
                console.log(error)
                success = 'no'
            }
        }else{
            console.log("ERROR: Token is undefined !")
            success = 'no'
        }
    }else{
        console.log("ERROR: Random and/or DateTime is undefined !")
        success = 'no'
    }

    res.status(200).json({
        success: success,
        token: token
    })
}