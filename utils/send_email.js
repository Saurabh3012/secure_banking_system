var fs = require('fs');

var config = require('../config/config');

var sendmail = require('sendmail')({
    silent: true,
    dkim: {
        privateKey: fs.readFileSync('config/key.pem', 'utf8'),
        keySelector: config.private_key.keyname
    }
});

sendmail({
    from: 'otp@yourdomain.com',
    to: 'saurabhg@iiitd.ac.in',
    subject: 'MailComposer sendmail',
    html: 'Mail of test sendmail '
}, function (err, reply) {
    console.log(err && err.stack)
    console.dir(reply)
})
