var bodyParser = require('body-parser');


module.exports = function (app, express) {

  app.use(express.static(__dirname + './../client'));
  //Allow Cors
  app.use(function(req, res, next) {
	  res.header('Access-Control-Allow-Origin', '*');
	  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	  res.header('Access-Control-Allow-Headers', 'Content-Type');
	  next();
  })
  // Parse Post Bodys
  //https://goo.gl/JFe5Np
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());//provided by above
};
