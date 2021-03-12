const db = require('../../../lib/db')

module.exports = async (req, res) => {
    let { token } = req.body
    var success = 'no'
    var role = 0
    if(token){
        const exists = await db.query(`SELECT role, username FROM user WHERE token='${token}' LIMIT 1`)
        if(exists.length === 0){
            console.log("ERROR: Token do not exist !")
        }else{
            if(!exists[0].username){
                success = 'yes'
                role = exists[0].role
            }else{
                success = 'already'
            }
        }
    }
    res.status(200).json({
        success: success,
        role: role
    })
}
