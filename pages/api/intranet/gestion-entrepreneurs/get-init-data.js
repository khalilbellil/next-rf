const db = require('../../../../lib/db')

module.exports = async (req, res) => {
    let { id_user } = req.body
    // let departments = undefined
    // let regions = undefined
    // let cities = undefined
    let success = 'no'
    let services = undefined
    if(id_user){
        // departments = await db.query(`SELECT id, name, code FROM department ORDER BY name ASC`)
        // regions = await db.query(`SELECT id, name, code FROM region ORDER BY name ASC`)
        services = await db.query(`SELECT id, name FROM service ORDER BY name ASC`)
        success = 'yes'
    }
    res.status(200).json({
        // departments: departments,
        // regions: regions
        success: success,
        services: services
    })
}
