const db = require('../../../lib/db')

module.exports = async (req, res) => {
    const { name, email, phone, address, city, description } = req.body
    if(name){
        //create address
        const insert_address = await db.query(`INSERT INTO address(address, city) VALUES('${address}', '${city}')`)

        //create client
        const insert_client = await db.query(`INSERT INTO client(id_address, email, firstname, phone) 
        VALUES('${insert_address.insertId}', '${email}', '${name}', '${phone}')`)

        //create project
        const insert_project = await db.query(`INSERT INTO project(id_client, id_address, id_status_project, description) 
        VALUES('${insert_client.insertId}', '${insert_address.insertId}', 1, '${description}')`)

        var success = 'no'
        if(insert_project.insertId){
            success = 'yes'
        }
        console.log("RES: ", success)
    }
    res.status(200).json({
        success: success
    })
}