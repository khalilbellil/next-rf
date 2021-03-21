const db = require('../../../../lib/db')
const { format } = require('date-fns');
const t_intranet = require('../../../../rf_toolbox/intranet')

module.exports = async (req, res) => {
    let { id_user } = req.body
    let success = 'no'
    let employees = undefined
    if(id_user){
        employees = await db.query(`SELECT * FROM employee ORDER BY c_date DESC LIMIT 50`)
        if(employees.length > 0){
            employees.forEach(e => {
                e.c_date = format(new Date(e.c_date), 'yyyy-MM-dd hh:mm:ss a')
            });
            success = 'yes'
        }
    }
    res.status(200).json({
        success: success,
        employees: employees
    })
}
