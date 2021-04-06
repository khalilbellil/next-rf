const db = require('../../../../lib/db')

module.exports = async (req, res) => {
    let { id_user, id_client, id_project, one, one_val } = req.body
    let success = 'no'
    if(id_user){
        try {
            if(one === 'name' || one === 'email' || one === 'phone' || one === 'phone2'){
                const ress = await db.query(`UPDATE client SET ${one} = '${one_val}' WHERE id = '${id_client}'`)
                if(ress.affectedRows > 0){
                    success = 'yes'
                }
            }else if(one === 'address_client'){
                const client = await db.query(`SELECT id_address FROM client WHERE id = '${id_client}' LIMIT 1`)
                const ress = await db.query(`UPDATE address SET address = '${one_val}' WHERE id = '${client[0].id_address}'`)
                if(ress.affectedRows > 0){
                    success = 'yes'
                }
            }else if(id_project && one === 'description' || one === 'id_service' || one === 'id_subservice' || one === 'budget' || one === 'id_project_delay' || one === 'callbacklater'){
                //console.log(one_val)
                const ress = await db.query(`UPDATE project SET ${one} = '${one_val}' WHERE id = '${id_project}'`)
                if(ress.affectedRows > 0){
                    success = 'yes'
                }
            }else if(id_project && one === 'zip' || one === 'code_department' || one === 'code_city' || one === 'code_region' || one === 'address'){
                const project = await db.query(`SELECT id_address FROM project WHERE id = '${id_project}' LIMIT 1`)
                const ress = await db.query(`UPDATE address SET ${one} = '${one_val}' WHERE id = '${project[0].id_address}'`)
                if(ress.affectedRows > 0){
                    success = 'yes'
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    res.status(200).json({
        success: success
    })
}
