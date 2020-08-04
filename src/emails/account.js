const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'ahmedsheridan@gmail.com',
        subject: 'Thank you for joining!',
        text: `Welcome ${name} to the app`,
    })
}

const sendCancelEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'ahmedsheridan@gmail.com',
        subject: 'Sad to see you leave',
        text: `Hi ${name}, we are so sad to see you leave, we would like to know your reason in order to improve`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}

