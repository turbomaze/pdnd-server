// deps
var utils = require('./utils');
var restify = require('restify');

// config
var pattern = process.env.PATTERN.split('').map(function(s) {
  return s === '1' ? true : false;
});
 
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

// routes
server.post('/pdnd/press', function (req, res, next) {
  // get the press type
  var body = utils.actuallyParseBody(req.body);
  var duration = parseInt(body.data);
  var pressType = utils.getPressType(duration);

  // add it to the queue
  queue.push(pressType);

  // shorten the queue if it's too long
  if (queue.length > pattern.length) {
    queue.shift();
  }

  // compare against the pattern
  if (utils.patternsMatch(pattern, queue)) {
    utils.soundAlarm();
  }

  console.log('duration ' + duration);
  console.log('press type ' + pressType);
  res.send(pressType);

  return next();
});
 
// start the server
server.listen(parseInt(process.env.PORT), function () {
  console.log('%s listening at %s', server.name, server.url);
});
