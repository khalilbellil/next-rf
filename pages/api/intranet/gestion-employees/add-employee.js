const db = require('../../../../lib/db')
var md5 = require("md5")

module.exports = async (req, res) => {
    let { id_user, new_employee } = req.body
    let success = 'no'
    let employee = undefined
    if(id_user && new_employee.firstname && new_employee.lastname && new_employee.email && new_employee.phone && new_employee.address){
        const token = md5(new_employee.email + new_employee.phone + 'khalil')

        // create user
        const user = await db.query(`INSERT INTO user(token, role) VALUES ('${token}',3)`)
        let address = undefined

        if(user?.insertId){
            // create address
            address = await db.query(`INSERT INTO address(address, zip, code_region, code_department, code_city) 
            VALUES ('${new_employee.address}', ${(new_employee.zip)?new_employee.zip:'null'}, ${(new_employee.code_region)?new_employee.code_region:'null'}, 
            ${(new_employee.code_department)?new_employee.code_department:'null'}, ${(new_employee.code_city)?new_employee.code_city:'null'})`)

            if(address?.insertId){
                // create employee
                employee = await db.query(`INSERT INTO employee(id_user, id_address, job_title, salary, firstname, lastname, email, phone, active) 
                VALUES ('${user.insertId}','${address.insertId}','${(new_employee.job_title)?new_employee.job_title:""}',${(new_employee.salary)?new_employee.salary:null},
                '${new_employee.firstname}','${new_employee.lastname}','${new_employee.email}','${new_employee.phone}', 1)`)

                // send an email with the link to create a password

                success = 'yes'
            }
        }
        

    }
    res.status(200).json({
        success: success
    })
}
