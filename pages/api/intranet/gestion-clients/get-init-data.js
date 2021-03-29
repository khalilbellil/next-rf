const db = require('../../../../lib/db')
const { format } = require('date-fns');
const t_intranet = require('../../../../rf_toolbox/intranet')

module.exports = async (req, res) => {
    let { id_user } = req.body
    let success = 'no'
    let delays = undefined
    if(id_user){
        delays = await db.query(`SELECT id, name FROM project_delay ORDER BY id ASC LIMIT 50`)
        success = "yes"
    }
    res.status(200).json({
        success: success,
        delays: delays
    })
}
