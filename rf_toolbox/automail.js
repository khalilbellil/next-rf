const nodemailer = require("nodemailer");
const db = require('../lib/db');

let transporter = nodemailer.createTransport({
    host: 'mail.smtp2go.com', // <= your smtp server here
    port: 2525, // <= connection port
    secure: false, // use SSL or not
    auth: {
        user: 'khalilbellil',
        pass: 'TrrzpQFdnNfj'
    }
});

export async function sendEmail(_to, _subject, _html, _from = 'RenovationFacile.fr <contact@renovationfacile.fr>'){
    var mailOptions = {
        from: _from,
        to: _to,
        subject: _subject,
        html: _html
    };
    transporter.sendMail(mailOptions, async function(error, info){
        if (error) {
            console.log(error);
            return error
        } else {
            console.log('Resultat de l\'envoie du courriel : ' + info.response);
            return true
        }
    });
    return true
}
export async function sendEmailById(_to, _id_email, _from = 'RenovationFacile.fr <contact@renovationfacile.fr>'){
    const email_result = await db.query(`SELECT content, subject, id_email_template FROM email WHERE id='${_id_email}' LIMIT 1`)
    let content = ''
    if(email_result[0].id_email_template){
        const email_template_result = await db.query(`SELECT email_start, email_end FROM email_template WHERE id='${email_result[0].id_email_template}' LIMIT 1`)
        content += email_template_result[0].email_start
        content += email_result[0].content
        content += email_template_result[0].email_end
    }else{
        content += email_result[0].content
    }
    var mailOptions = {
        from: _from,
        to: _to,
        subject: email_result[0].subject,
        html: content
    };
    transporter.sendMail(mailOptions, async function(error, info){
        if (error) {
            console.log(error);
            //todo: insert error into email_log
            return error
        } else {
            console.log('Resultat de l\'envoie du courriel : ' + info.response);
            //todo: insert success into email_log
            return true
        }
    });
}