const { pl } = require('date-fns/locale')
const db = require('../../../lib/db')

module.exports = async (req, res) => {
    const { name, email, phone, company_name } = req.body
    if (name) {

        // create user
        const insert_user = await db.query(`INSERT INTO user(role) VALUES('5')`)

        //create contractor
        const insert_contracor = await db.query(`INSERT INTO contractor(name, email, phone, company_name, id_user)
         VALUES('${name}', '${email}', '${phone}', '${company_name}', '${insert_user.insertId}')`)

        var success = 'no'
        if (insert_contracor.insertId) {
            success = 'yes'
        }
        console.log("response: ", success)
    }
    res.status(200).json({
        success: success
    })
}