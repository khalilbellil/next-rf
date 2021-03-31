const db = require('../../../lib/db')
const automail = require('../../../rf_toolbox/automail')

module.exports = async (req, res) => {
    let { name, email, phone, address, zip, description } = req.body
    var success = 'no'
    if(name && email && phone && description){
        let insert_address, insert_client, insert_project, uid_client, codeDepartement, codeRegion, codeCity = undefined

        if(zip?.length === 5){
            fetch(`https://geo.api.gouv.fr/communes?codePostal=${zip}`)
            .then(res => res.json())
            .then(res => {
                if(res.length === 1){
                    codeDepartement = res[0].codeDepartement
                    codeRegion = res[0].codeRegion
                    codeCity = res[0].code
                }else if(res.length > 1){
                    const newRes = res.sort(function(a, b) {    
                        if (a["population"] < b["population"]) {    
                            return 1;    
                        } else if (a["population"] > b["population"]) {    
                            return -1;    
                        }    
                        return 0;    
                    })//order by population desc
                    codeDepartement = newRes[0].codeDepartement
                    codeRegion = newRes[0].codeRegion
                    codeCity = newRes[0].code
                }else{
                    console.log('Code postal inconnu')
                }
            })
            .catch(err => console.log("ERROR: ", err))
        }
        //create address
        if(codeDepartement && codeRegion && codeCity){
            insert_address = await db.query(`INSERT INTO address(address, zip, code_departement, code_region, code_city) VALUES('${(address)?address:''}', '${zip}', '${codeDepartement}', '${codeRegion}', '${codeCity}')`)
        }else{
            insert_address = await db.query(`INSERT INTO address(address, zip) VALUES('${(address)?address:''}', '${zip}')`)
        }
        if (insert_address?.insertId) {
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
