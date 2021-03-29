const db = require('../../../lib/db')
const { format } = require('date-fns');
const t_intranet = require('../../../rf_toolbox/intranet')

module.exports = async (req, res) => {
    let { id_user, id_client } = req.body
    let history = undefined
    if(id_user){
        history = await t_intranet.getProjectHistory(id_client)
            history.forEach(h => {
                h.c_date = format(new Date(h.c_date), 'yyyy-MM-dd hh:mm:ss a')
            });
    }
    res.status(200).json({
        history: history
    })
}
