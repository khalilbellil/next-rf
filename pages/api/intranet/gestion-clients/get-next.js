const db = require('../../../../lib/db')
const { format } = require('date-fns');
const t_intranet = require('../../../../rf_toolbox/intranet')

module.exports = async (req, res) => {
    let { id_user } = req.body
    let success = 'no'
    let client = undefined
    let history = undefined
    if(id_user){
        client = await db.query(``)
        if(client.length > 0){
            client = client[0]
            if(client.c_date){
                client.c_date = format(new Date(client.c_date), 'yyyy-MM-dd hh:mm:ss a')
            }
            if(client.m_date){
                client.m_date = format(new Date(client.m_date), 'yyyy-MM-dd hh:mm:ss a')
            }
            history = await t_intranet.getClientHistory(client.id)
            history.forEach(h => {
                h.c_date = format(new Date(h.c_date), 'yyyy-MM-dd hh:mm:ss a')
            });
            success = 'yes'
        }
    }
    res.status(200).json({
        success: success,
        client: client,
        history: history
    })
}
