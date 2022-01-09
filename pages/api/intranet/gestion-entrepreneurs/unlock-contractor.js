const db = require('../../../../lib/db')
const { format } = require('date-fns');
const t_intranet = require('../../../../rf_toolbox/intranet')

module.exports = async (req, res) => {
    let { id_user, id_contractor } = req.body
    let success = 'no'
    if(id_user){
        let unlocked = await t_intranet.unlockContractor(id_contractor, id_user);
        if(unlocked){
            success = 'yes'
        }
    }
    res.status(200).json({
        success: success
    })
}
