module.exports = {
  actuallyParseBody: function(s) {
    return s.split('&').reduce(function(a, keyValue) {
      var key = keyValue.split('=')[0];
      var value = keyValue.split('=')[1];
      a[key] = value;
      return a;
    }, {});
  }
};
