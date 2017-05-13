var utils = require('./utils');
var restify = require('restify');
 
var server = restify.createServer({
  name: 'pdnd-server',
  version: '0.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
 
server.post('/pdnd/press', function (req, res, next) {
  var body = utils.actuallyParseBody(req.body);
  console.log(body);
  res.send(body);
  return next();
});
 
server.listen(parseInt(process.env.PORT), function () {
  console.log('%s listening at %s', server.name, server.url);
});
