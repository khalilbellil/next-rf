const db = require('../../../../lib/db')

module.exports = async (req, res) => {
    let { id_user } = req.body
    let departments = undefined
    let regions = undefined
    let cities = undefined
    if(id_user){
        departments = await db.query(`SELECT id, name FROM department`)
        regions = await db.query(`SELECT id, name FROM region`)
        cities = await db.query(`SELECT id, name FROM city`)
    }
    res.status(200).json({
        departments: departments,
        regions: regions,
        cities: cities
    })
}
