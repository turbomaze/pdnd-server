var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD
  }
});

function sendEmail(subject, message, recipients) {
  // setup email data with unicode symbols
  var mailOptions = {
    from: 'PDND <pdndisturb@gmail.com>', // sender address
    to: recipients, // list of receivers
    subject: subject, // Subject line
    text: message // plain text body
  };
  
  // end mail with defined transport object
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      return console.log(err);
    }
    console.log(
      'Message %s sent: %s', info.messageId, info.response
    );
  });
}

module.exports = {
  actuallyParseBody: function(s) {
    return s.split('&').reduce(function(a, keyValue) {
      var key = keyValue.split('=')[0];
      var value = keyValue.split('=')[1];
      a[key] = value;
      return a;
    }, {});
  },

  getPressType: function(a) {
    return a > parseInt(process.env.THRESHOLDMS) ? true : false;
  },

  patternsMatch: function(a, b) {
    for (var i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  },

  soundAlarm: function() {
    console.log('alerted');

    // email
    sendEmail(
      '[urgent] Please do not disturb our room! eom',
      '',
      process.env.EMAIL_RECIPIENTS
    );

    // TODO: twilio
    // TODO: messenger
    // TODO: slack
  }
};
