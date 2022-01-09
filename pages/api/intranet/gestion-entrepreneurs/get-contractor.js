const db = require('../../../../lib/db')
const { format } = require('date-fns');
const t_intranet = require('../../../../rf_toolbox/intranet')

module.exports = async (req, res) => {
    let { id_user, search } = req.body
    let success = 'no'
    let contractor = undefined
    let history = undefined
    let alreadyLockedBy = undefined
    if(id_user){
        contractor = await db.query(`SELECT c.id, c.id_user, c.id_address, c.id_contractor_status, c.callbacklater, c.email, c.name, c.phone, c.phone2, c.company_name, 
        c.company_number, c.c_date, c.id_service, c.id_secondary_service, a.address, a.code_city, a.zip, a.code_department, a.code_region, cs.name as status FROM contractor c 
        LEFT JOIN address a ON c.id_address = a.id 
        LEFT JOIN contractor_status cs ON c.id_contractor_status = cs.id
        WHERE c.id = '${search}' OR c.email = '${search}' OR c.name LIKE '%${search}%' OR c.phone = '${search}' OR c.phone2 = '${search}' OR c.company_name LIKE '%${search}%'`)
        if (contractor.length > 0) {
            contractor = contractor[0];
            let locked = await t_intranet.lockContractor(contractor.id, id_user);
            if(locked === 'true'){
              if (contractor.c_date) {
                contractor.c_date = format(new Date(contractor.c_date), 'yyyy-MM-dd hh:mm:ss a');
              }
              if (contractor.m_date) {
                contractor.m_date = format(new Date(contractor.m_date), 'yyyy-MM-dd hh:mm:ss a');
              }
              history = await t_intranet.getContractorHistory(contractor.id);
              history.forEach(h => {
                h.c_date = format(new Date(h.c_date), 'yyyy-MM-dd hh:mm:ss a');
              });
              success = 'yes';
            }else{
              success = 'already-locked';
              alreadyLockedBy = locked
            }
        }
    }
    res.status(200).json({
        success: success,
        contractor: contractor,
        history: history,
        alreadyLockedBy: alreadyLockedBy
    })
}
