// deps
var utils = require('./utils');
var restify = require('restify');

// config
var pattern = process.env.PATTERN.split('').map(function(s) {
  return s === '1' ? true : false;
});
var timeout = parseInt(process.env.TIMEOUTMS);
 
// set up the server
var server = restify.createServer({
  name: 'pdnd-server',
  version: '0.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
 
// state
var queue = [];
var timeOfLastPress = +new Date();
var timeOfLastSend = +new Date();

// routes
server.post('/pdnd/press', function (req, res, next) {
  // get the press type
  var body = utils.actuallyParseBody(req.body);
  var duration = parseInt(body.data);
  var pressType = utils.getPressType(duration);

  if (process.env.DEBUG === 'true') {
    console.log('duration ' + duration);
    console.log('press type ' + pressType);
  }

  // add it to the queue
  var currentTime = +new Date();
  var pressDuration = currentTime - timeOfLastPress;
  timeOfLastPress = currentTime;
  if (pressDuration > timeout) {
    queue = [pressType];
  } else {
    // add it to the queue
    queue.push(pressType);

    if (queue.length > pattern.length) {
      // shorten the queue if it's too long
      queue.shift();
    }
  }

  // compare against the pattern
  console.log(pattern, queue);
  if (utils.patternsMatch(pattern, queue)) {
    var sendDuration = currentTime - timeOfLastSend;
    if (sendDuration > timeout) {
      utils.soundAlarm();
      timeOfLastPress = currentTime;
    }
  }
  res.send(pressType);

  return next();
});
 
// start the server
server.listen(parseInt(process.env.PORT), function () {
  console.log('%s listening at %s', server.name, server.url);
});
