const nodemailer = require("nodemailer");
const db = require('../lib/db');

export async function getDepartmentId(code){
    let department = await db.query(`SELECT id FROM department WHERE code = ${code} LIMIT 1`)
    return department[0].id
}