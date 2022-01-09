const db = require('../../../../lib/db')
const t_intranet = require('../../../../rf_toolbox/intranet')

module.exports = async (req, res) => {
    let { id_user, id_contractor, status, callbacklater } = req.body
    let success = 'no'
    if(status === 'callbacklater'){
        await db.query(`UPDATE contractor SET callbacklater = '${callbacklater}' WHERE id = '${id_contractor}'`)
        await t_intranet.addContractorHistory(id_contractor, `Rappeler plus tard -> ${callbacklater}`, id_user)
        success = 'yes'
    }else if(status === 'notinterested'){
        await db.query(`UPDATE contractor SET id_contractor_status = 4 WHERE id = '${id_contractor}'`)
        await t_intranet.addContractorHistory(id_contractor, `Pas interéssé`, id_user)
        success = 'yes'
    }else if(status === 'verified'){
        await db.query(`UPDATE contractor SET id_contractor_status = 2, verified_date = NOW() WHERE id = '${id_contractor}'`)
        await t_intranet.addContractorHistory(id_contractor, `Verifié`, id_user)
        success = 'yes'
    }else if(status === 'refused'){
        await db.query(`UPDATE contractor SET id_contractor_status = 3 WHERE id = '${id_contractor}'`)
        await t_intranet.addContractorHistory(id_contractor, `Refusé`, id_user)
        success = 'yes'
    }

    res.status(200).json({
        success: success
    })
}
