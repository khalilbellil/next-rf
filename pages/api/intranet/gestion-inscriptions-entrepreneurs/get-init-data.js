const db = require('../../../../lib/db')

module.exports = async (req, res) => {
    let { id_user } = req.body
    let departments = undefined
    let regions = undefined
    let cities = undefined
    if(id_user){
        departments = await db.query(`SELECT id, name FROM department ORDER BY name ASC`)
        regions = await db.query(`SELECT id, name FROM region ORDER BY name ASC`)
    }
    res.status(200).json({
        departments: departments,
        regions: regions
    })
}
