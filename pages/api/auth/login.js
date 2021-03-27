const db = require('../../../lib/db')
var md5 = require("md5")

module.exports = async (req, res) => {
    let { username, password } = req.body
    let success = 'no'
    let role = 0
    let id_user = ''
    if(username && password){
        const exists = await db.query(`SELECT id, hashed_password, role FROM user WHERE username='${username}' LIMIT 1`)
        if(exists.length === 0){
            console.log("ERROR: User do not exist !")
        }else{
            
            const hash = md5(password + 'khalil')
            if(exists[0].hashed_password == hash){
                success = 'yes'
                role = exists[0].role
                id_user = exists[0].id
            }
        }
    }
    
    res.status(200).json({
        success: success,
        id_user: id_user,
        role: role
    })
}
