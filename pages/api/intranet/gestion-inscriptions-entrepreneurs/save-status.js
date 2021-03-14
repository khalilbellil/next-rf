const db = require('../../../../lib/db')

module.exports = async (req, res) => {
    let { uid_contractor, status } = req.body
    
    

    res.status(200).json({
        success: success
    })
}
