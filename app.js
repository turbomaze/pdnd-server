var restify = require('restify');
 
var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
 
server.post('/pdnd/press', function (req, res, next) {
  console.log(req.body);
  res.send(req.body);
  return next();
});
 
server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
