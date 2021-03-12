const { pl } = require('date-fns/locale')
const db = require('../../../lib/db')
var md5 = require("md5")

module.exports = async (req, res) => {
    const { name, email, phone, company_name } = req.body
    var success = 'no'
    if (name) {
        // create user
        const token = md5(email + phone)
        const insert_user = await db.query(`INSERT INTO user(role, token) VALUES(4, '${token}')`)

        if(insert_user.insertId){
            //create contractor
            const insert_contracor = await db.query(`INSERT INTO contractor(name, email, phone, company_name, id_user)
            VALUES('${name}', '${email}', '${phone}', '${company_name}', '${insert_user.insertId}')`)
            if (insert_contracor.insertId) {
                success = 'yes'
            }
        }
    }
    res.status(200).json({
        success: success
    })
}