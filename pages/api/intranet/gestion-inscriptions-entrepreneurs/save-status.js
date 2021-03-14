const db = require('../../../../lib/db')

module.exports = async (req, res) => {
    let { id_user, id_contractor, status, callbacklater } = req.body
    let success = 'no'
    if(status === 'callbacklater'){
        await db.query(`UPDATE contractor SET callbacklater = '${callbacklater}' WHERE id = '${id_contractor}'`)
        success = 'yes'
    }else if(status === 'notinterested'){
        await db.query(`UPDATE contractor SET id_contractor_status = 4 WHERE id = '${id_contractor}'`)
        success = 'yes'
    }else if(status === 'verified'){
        await db.query(`UPDATE contractor SET id_contractor_status = 2 WHERE id = '${id_contractor}'`)
        success = 'yes'
    }else if(status === 'refused'){
        await db.query(`UPDATE contractor SET id_contractor_status = 3 WHERE id = '${id_contractor}'`)
        success = 'yes'
    }

    res.status(200).json({
        success: success
    })
}
