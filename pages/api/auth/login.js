const db = require('../../../lib/db')
var md5 = require("md5")

module.exports = async (req, res) => {
    let { username, password } = req.body
    var success = 'no'
    if(username && password){
        const exists = await db.query(`SELECT token FROM user WHERE username='${username}' LIMIT 1`)
        if(exists.length === 0){
            console.log("ERROR: User do not exist !")
        }else{
            const hash = md5(password + 'khalil')
            if(exists[0].token == hash){
                success = 'yes'
            }
        }
    }
    res.status(200).json({
        success: success
    })
}
