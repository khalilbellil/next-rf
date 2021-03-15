const { oneOfType } = require('prop-types')
const db = require('../../../../lib/db')

module.exports = async (req, res) => {
    let { id_user, id_contractor, one, one_val } = req.body
    let success = 'no'
    
    if(one !== 'id_city' && one !== 'id_region' && one !== 'id_department' && one !== 'zip' && one !== 'address'){
        await db.query(`UPDATE contractor SET ${one} = '${one_val}' WHERE id = '${id_contractor}'`)
        success = 'yes'
    }else{
        const contractor = await db.query(`SELECT id_address FROM contractor WHERE id = '${id_contractor}' LIMIT 1`)
        const res = await db.query(`UPDATE address SET ${one} = '${one_val}' WHERE id = '${contractor[0].id_address}'`)
        if(res.affectedRows > 0){
            success = 'yes'
        }
    }

    res.status(200).json({
        success: success
    })
}
