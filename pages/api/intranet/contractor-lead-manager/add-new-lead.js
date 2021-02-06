const db = require('../../../../lib/db')

module.exports = async (req, res) => {
    let { name, company_name, email, phone, phone2, city } = req.body
    
    

    res.status(200).json({
        success: success
    })
}
