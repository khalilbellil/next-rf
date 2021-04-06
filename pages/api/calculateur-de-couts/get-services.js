const db = require('../../../lib/db')
var md5 = require("md5")

module.exports = async (req, res) => {
    let success = 'no'
    let services = undefined
    try {
        services = await db.query(`SELECT * FROM sr_cost_calculator_service ORDER BY name ASC LIMIT 50`)
        success = 'yes'
    } catch (error) {
        console.log(error)
    }
    res.status(200).json({
        success: success,
        services: services
    })
}