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
