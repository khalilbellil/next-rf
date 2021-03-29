const nodemailer = require("nodemailer");
const db = require('../lib/db');

export async function addContractorHistory(id_contractor, action){
    let success = false
    const insert = await db.query(`INSERT INTO history_contractor(id_contractor, name) VALUES('${id_contractor}', '${action}')`)
    if(insert.insertId){
        success = true
    }
    return success
}

export async function getContractorHistory(id_contractor){
    return await db.query(`SELECT * FROM history_contractor WHERE id_contractor='${id_contractor}' ORDER BY id DESC LIMIT 50`)
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