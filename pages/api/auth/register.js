const db = require('../../../lib/db')
var md5 = require("md5")
const automail = require('../../../rf_toolbox/automail')

module.exports = async (req, res) => {
    let { username, password } = req.body
    var success = 'no'
    if(username && password){
        const exists = await db.query(`SELECT id FROM user WHERE username='${username}' LIMIT 1`)
        if(exists.length > 0){
            console.log("ERROR: User already registred !")
        }else{
            const hash = md5(password + 'khalil')
            const insert_user = await db.query(`INSERT INTO user(username, token, role) VALUES('${username}', '${hash}', 4)`)// 1 = admin, 2 = chef agent, 3 = agent, 4 = contractor
            
            if(insert_user?.insertId){
                success = 'yes'
                //automail.sendEmailById(email, 2)
            }
        }
    }
    res.status(200).json({
        success: success
    })
}
