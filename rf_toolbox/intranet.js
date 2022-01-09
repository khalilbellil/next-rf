const nodemailer = require("nodemailer");
const db = require('../lib/db');

export async function addContractorHistory(id_contractor, action, id_user){
    let success = false
    const insert = await db.query(`INSERT INTO history_contractor(id_contractor, name, id_user) VALUES('${id_contractor}', '${action}', '${id_user}')`)
    if(insert.insertId){
        success = true
    }
    return success
}

export async function getContractorHistory(id_contractor){
    return await db.query(`SELECT hc.*, u.username FROM history_contractor hc LEFT JOIN user u ON u.id = hc.id_user WHERE hc.id_contractor = '${id_contractor}' ORDER BY hc.id DESC LIMIT 50`)
}

export async function addProjectHistory(id_client, id_project, id_user, action){
    let success = false
    const insert = await db.query(`INSERT INTO history_project(id_client, id_project, id_user, name) VALUES('${id_client}', '${id_project}', '${id_user}', '${action}')`)
    if(insert.insertId){
        success = true
    }
    return success
}

export async function getProjectHistory(id_client){
    return await db.query(`SELECT * FROM history_project WHERE id_client='${id_client}' ORDER BY id DESC LIMIT 50`)
}

export async function lockContractor(id_contractor, id_user){
    let success = 'false'
    let already = await db.query(`SELECT u.username, u.id as id_user FROM contractor_lock cl LEFT JOIN user u ON u.id = cl.id_user WHERE id_contractor = '${id_contractor}'`)
    if(already[0]?.id_user == id_user){
        success = 'true'
    }else{
        if(already.length == 0){
            success = await db.query(`INSERT INTO contractor_lock(id_contractor, id_user) VALUES ('${id_contractor}', '${id_user}')`)
            if(success?.affectedRows > 0){
                await addContractorHistory(id_contractor, 'Verrouillage', id_user)
                success = 'true'
            }
        }else{
            success = already[0].username
        }
    }
    return success
}

export async function unlockContractor(id_contractor, id_user){
    let success = await db.query(`DELETE FROM contractor_lock WHERE id_contractor = '${id_contractor}'`)
    if(success?.affectedRows > 0){
        await addContractorHistory(id_contractor, 'Déverrouillage', id_user)
        success = true
    }
    return success
}