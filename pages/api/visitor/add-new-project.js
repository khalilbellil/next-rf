const db = require('../../../lib/db')
const automail = require('../../../rf_toolbox/automail')

module.exports = async (req, res) => {
    let { name, email, phone, address, city, description } = req.body
    var success = 'no'
    if(name && email && phone && description){
        let insert_address, insert_client, insert_project, uid_client = undefined
        if(address && phone){
            //create address
            insert_address = await db.query(`INSERT INTO address(address, city) VALUES('${address}', '${city}')`)
        }
        if (insert_address.insertId) {
            const exist_client = await db.query(`SELECT id FROM client WHERE phone='${phone}' OR email='${email}' LIMIT 1`)//get client if exists
            if(exist_client.length > 0){
                //update client
                insert_client = await db.query(`UPDATE client SET id_address='${insert_address.insertId}', 
                email='${email}', name='${name}', phone='${phone}' WHERE id=${exist_client[0].id}`)
                uid_client = exist_client[0].id
            }else{
                //create client
                insert_client = await db.query(`INSERT INTO client(id_address, email, name, phone) 
                VALUES('${insert_address.insertId}', '${email}', '${name}', '${phone}')`)
                uid_client = insert_client.insertId
            }
        }
        if (insert_address.insertId && uid_client) {
            //create project
            insert_project = await db.query(`INSERT INTO project(id_client, id_address, id_project_status, description) 
                VALUES('${uid_client}', '${insert_address.insertId}', 1, '${description}')`)
        }
        if(insert_project?.insertId){
            success = 'yes'
            // automail.sendEmail(email, 'RenoFacile.ma - Confirmation de votre demande', `Bonjour <b>${name}</b>,<br>
            // ceci est pour vous confirmer que nous avons bien recu votre <b>demande de mise en relation avec un entrepreneur</b> et allons la traiter dans les plus bref délais.<br>
            // Merci pour votre compréhension.`)
            automail.sendEmailById(email, 1)
        }
    }
    res.status(200).json({
        success: success
    })
}
