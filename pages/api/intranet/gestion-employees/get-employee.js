const db = require('../../../../lib/db')
const { format } = require('date-fns');
const t_intranet = require('../../../../rf_toolbox/intranet')

module.exports = async (req, res) => {
    let { id_user, id_employee } = req.body
    let success = 'no'
    let employee = undefined
    if(id_user){
        employee = await db.query(`SELECT * FROM employee WHERE id='${id_employee}' LIMIT 1`)
        if(employee.length > 0){
            employee = employee[0]
            employee = {...employee, c_date: format(new Date(employee.c_date), 'yyyy-MM-dd hh:mm:ss a')}
            success = 'yes'
        }
    }
    res.status(200).json({
        success: success,
        employee: employee
    })
}
