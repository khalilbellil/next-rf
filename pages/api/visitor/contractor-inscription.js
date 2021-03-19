const db = require('../../../lib/db')
var md5 = require("md5")

module.exports = async (req, res) => {
    const { name, email, phone, company_name } = req.body
    let success = 'no'
    if (name) {
        try {
            // create user
            const token = md5(email + phone)
            const insert_user = await db.query(`INSERT INTO user(role, token) VALUES(4, '${token}')`)
            if(insert_user.insertId){
                //create address
                const insert_address = await db.query(`INSERT INTO address(address) VALUES('')`)
                //create contractor
                const insert_contracor = await db.query(`INSERT INTO contractor(name, email, phone, company_name, id_user, id_address)
                VALUES('${name}', '${email}', '${phone}', '${company_name}', '${insert_user.insertId}', '${insert_address.insertId}')`)
                if (insert_contracor.insertId) {
                    success = 'yes'
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    res.status(200).json({
        success: success
    })
}