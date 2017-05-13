var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD
  }
});

function sendAlarmEmail(message, address) {
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
  };
  
  //end mail with defined transport object
  trsporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
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

    // twilio
    // email
    // messenger
    // slack
  }
};
