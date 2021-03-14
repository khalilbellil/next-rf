const db = require('../../../../lib/db')
const { format } = require('date-fns');

module.exports = async (req, res) => {
    let { id_user } = req.body
    let success = 'no'
    let contractor = undefined
    
    if(id_user){
        contractor = await db.query(`SELECT * FROM contractor WHERE id_contractor_status = 1 AND callbacklater IS NULL OR callbacklater <= NOW() ORDER BY c_date ASC LIMIT 1`)
        if(contractor.length > 0){
            contractor = contractor[0]
            if(contractor.c_date){
                contractor.c_date = format(new Date(contractor.c_date), 'yyyy-MM-dd hh:mm:ss a')
            }
            if(contractor.m_date){
                contractor.m_date = format(new Date(contractor.m_date), 'yyyy-MM-dd hh:mm:ss a')
            }
            success = 'yes'
        }
    }

    res.status(200).json({
        success: success,
        contractor: contractor
    })
}
