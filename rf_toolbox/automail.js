const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: 'mail.smtp2go.com', // <= your smtp server here
    port: 2525, // <= connection port
    secure: false, // use SSL or not
    auth: {
        user: 'khalilbellil',
        pass: 'TrrzpQFdnNfj'
    }
});

export async function sendEmail(_to, _subject, _html, _from = 'RenoFacile.ma <noreply@renofacile.ma>'){
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
export async function sendEmailById(_to, _id_email, _from = 'RenoFacile.ma <noreply@renofacile.ma>'){
    const email_result = await getQuery(`SELECT content, subject FROM email WHERE id='${_id_email}' LIMIT 1`)[0]
    var mailOptions = {
        from: _from,
        to: _to,
        subject: email_result.subject,
        html: email_result.content
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