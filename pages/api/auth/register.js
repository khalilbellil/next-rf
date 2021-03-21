const db = require('../../../lib/db')
var md5 = require("md5")
const automail = require('../../../rf_toolbox/automail')

module.exports = async (req, res) => {// roles: 1 = admin, 2 = chef agent, 3 = agent, 4 = contractor
    let { password, from, token } = req.body
    var success = 'no'
    var id_user = ''
    try {
        if(from && password){
            const exists = await db.query(`SELECT id FROM user WHERE token='${token}' LIMIT 1`)
            id_user = exists[0].id
            if(exists.length === 0){
                console.log("ERROR: Registration was not authorized !")
            }else{
                const hash = md5(password + 'khalil')
                if(from === 'extranet'){
                    const select_contractor = await db.query(`SELECT email, phone FROM contractor WHERE id_user='${exists[0].id}' AND verified=1 LIMIT 1`)
                    if(select_contractor.length > 0){
                        await db.query(`UPDATE user SET username='${select_contractor[0].email}', role=4, hashed_password='${hash}' WHERE token='${token}'`)
                        success = 'yes'
                    }
                }else if(from === 'intranet'){
                    const select_employee = await db.query(`SELECT email FROM employee WHERE id_user='${exists[0].id}' LIMIT 1`)
                    if(select_employee.length > 0){
                        await db.query(`UPDATE user SET username='${select_employee[0].email}', role=3, hashed_password='${hash}' WHERE token='${token}'`)
                        success = 'yes'
                    }
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
    
    res.status(200).json({
        success: success,
        id_user: id_user
    })
}
