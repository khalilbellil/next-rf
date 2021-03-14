const { oneOfType } = require('prop-types')
const db = require('../../../../lib/db')

module.exports = async (req, res) => {
    let { id_user, id_contractor, one, one_val } = req.body
    let success = 'no'
    
    if(one !== 'departement' && one !== 'zip' && one !== 'address'){
        await db.query(`UPDATE contractor SET ${one} = '${one_val}' WHERE id = '${id_contractor}'`)
        success = 'yes'
    }else{
        const contractor = await db.query(`SELECT id_address FROM contractor WHERE id = '${id_contractor}' LIMIT 1`)
        await db.query(`UPDATE address SET ${one} = '${one_val}' WHERE id = '${contractor[0].id_address}'`)
        success = 'yes'
    }

    res.status(200).json({
        success: success
    })
}
