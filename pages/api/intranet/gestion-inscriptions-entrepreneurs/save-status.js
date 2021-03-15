const db = require('../../../../lib/db')
const t_intranet = require('../../../../rf_toolbox/intranet')

module.exports = async (req, res) => {
    let { id_user, id_contractor, status, callbacklater } = req.body
    let success = 'no'
    if(status === 'callbacklater'){
        await db.query(`UPDATE contractor SET callbacklater = '${callbacklater}' WHERE id = '${id_contractor}'`)
        await t_intranet.addContractorHistory(id_contractor, `Rappeler plus tard -> ${callbacklater}`)
        success = 'yes'
    }else if(status === 'notinterested'){
        await db.query(`UPDATE contractor SET id_contractor_status = 4 WHERE id = '${id_contractor}'`)
        await t_intranet.addContractorHistory(id_contractor, `Pas interéssé`)
        success = 'yes'
    }else if(status === 'verified'){
        await db.query(`UPDATE contractor SET id_contractor_status = 2 WHERE id = '${id_contractor}'`)
        await t_intranet.addContractorHistory(id_contractor, `Verifié`)
        success = 'yes'
    }else if(status === 'refused'){
        await db.query(`UPDATE contractor SET id_contractor_status = 3 WHERE id = '${id_contractor}'`)
        await t_intranet.addContractorHistory(id_contractor, `Refusé`)
        success = 'yes'
    }

    res.status(200).json({
        success: success
    })
}
