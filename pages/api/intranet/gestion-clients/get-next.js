const db = require('../../../../lib/db')
const { format } = require('date-fns');
const t_intranet = require('../../../../rf_toolbox/intranet')

module.exports = async (req, res) => {
    let { id_user } = req.body
    let success = 'no'
    let client = undefined
    let projects = undefined
    let history = undefined
    if(id_user){
        //check for client with projects set for callbacklater in ASC order
        client = await db.query(`SELECT c.id, c.name, c.email, c.phone, c.phone2, c.id_address, a.id_city, a.id_department, a.id_region, a.address, a.zip FROM client c 
        LEFT JOIN project p ON p.id_client = c.id LEFT JOIN address a ON a.id = p.id_address WHERE p.id_project_status IN(1,2) AND p.callbacklater <= NOW() ORDER BY p.c_date ASC LIMIT 1`)
        if(client.length === 0){
            //check for client with waiting projects in ASC order
            client = await db.query(`SELECT c.id, c.name, c.email, c.phone, c.phone2, c.id_address, a.id_city, a.id_department, a.id_region, a.address, a.zip FROM client c 
            LEFT JOIN project p ON p.id_client = c.id LEFT JOIN address a ON a.id = p.id_address WHERE p.id_project_status = 1 ORDER BY p.c_date ASC LIMIT 1`)
        }
        if(client.length > 0){
            client = client[0]
            if(client.c_date){
                client.c_date = format(new Date(client.c_date), 'yyyy-MM-dd HH:mm:ss')
            }
            if(client.m_date){
                client.m_date = format(new Date(client.m_date), 'yyyy-MM-dd HH:mm:ss')
            }
            projects = await db.query(`SELECT p.*, s.name as project_status FROM project p LEFT JOIN project_status s ON s.id = p.id_project_status WHERE id_client='${client.id}' ORDER BY c_date DESC LIMIT 50`)
            projects.forEach(p => {
                if(p.c_date){
                    p.c_date = format(new Date(p.c_date), 'yyyy-MM-dd HH:mm:ss')
                }
                if(p.callbacklater){
                    p.callbacklater = (p.callbacklater)?format(new Date(p.callbacklater), 'yyyy-MM-dd HH:mm:ss'):''
                    p.callbacklater = p.callbacklater.replace(":00 ", " ")
                }
            });
            history = await t_intranet.getProjectHistory(client.id)
            history.forEach(h => {
                h.c_date = format(new Date(h.c_date), 'yyyy-MM-dd HH:mm:ss')
            });
            success = 'yes'
        }
    }
    res.status(200).json({
        success: success,
        client: client,
        projects: projects,
        history: history
    })
}
