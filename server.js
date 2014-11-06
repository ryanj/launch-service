var cc          = require('config-multipaas'),
    restify     = require('restify'),
    fs          = require('fs')

var config      = cc().add({DEFAULT_BTN_TEXT: process.env.DEFAULT_BTN_TEXT || "LAUNCH ON"}),
    app         = restify.createServer()

app.use(restify.queryParser())
app.use(restify.CORS())
app.use(restify.fullResponse())

// Routes
app.get('/status', function (req, res, next)
{
  res.send("{status: 'ok'}");
});

var getbutton = function (req, res, next)
{
  var text = req.params.text || ''
  if ( text.search(".svg") >= 0 ){
    text = text.slice(0, text.search(".svg"))
  }
  if (text == ''){ 
    text = config.get('DEFAULT_BTN_TEXT')
  }
  
  var data = fs.readFileSync(__dirname + '/static/img/launchbutton.svg');
  console.log('button: {text: "'+text+'"}')
  res.status(200);
  res.header('Content-Type', 'image/svg+xml');
  res.end(data.toString().replace(/LAUNCH ON/, text));
};

app.get('/button.svg', getbutton)
app.get('/button/:text', getbutton)

app.get('/', function (req, res, next)
{
  var data = fs.readFileSync(__dirname + '/index.html');
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.end(data.toString().replace(/host:port/g, req.header('Host')));
});

app.get(/\/(css|js|img)\/?.*/, restify.serveStatic({directory: './static/'}));

app.listen(config.get('PORT'), config.get('IP'), function () {
  console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT') )
});
