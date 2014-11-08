var cc          = require('config-multipaas'),
    restify     = require('restify'),
    fs          = require('fs')

var launchthis  = require('./package.json').openshift.launch_url
var config      = cc().add({
      DEFAULT_BTN_TEXT: process.env.DEFAULT_BTN_TEXT || "LAUNCH ON",
      DEFAULT_LAUNCH_URL: process.env.LAUNCH_URL || launchthis }),
    app         = restify.createServer()

app.use(restify.queryParser())
app.use(restify.CORS())
app.use(restify.fullResponse())

var cleanbuttontext = function (text)
{
  text = text || ''
  if ( text.search(".svg") >= 0 ){
    text = text.slice(0, text.search(".svg"))
  }
  if (text == ''){ 
    text = config.get('DEFAULT_BTN_TEXT')
  }
  return text
}

var findtemplate = function (url)
{
  var template = "launchbutton"
  if(url.search('launch/light')>=0){
    template = "launchbutton_light"
  }
  return template
}

var svgtemplate = function (req, res, next)
{
  var buttontext = cleanbuttontext(req.params.text)
  var svgtemplate = findtemplate(req.url)
  var data = fs.readFileSync(__dirname + '/static/img/'+svgtemplate+'.svg');
  console.log('button: {text: "'+buttontext+'", template: "'+svgtemplate+'"}')
  res.status(200);
  res.header('Content-Type', 'image/svg+xml');
  res.end(data.toString().replace(/LAUNCH ON/, buttontext));
};

// Routes
app.get('/status', function (req, res, next)
{
  res.send("{status: 'ok'}");
});

//Old urls, deprecated:
app.get('/button/:text', svgtemplate)
app.get('/button.svg', svgtemplate)

//SVG template urls:
app.get('/launch/light.svg', svgtemplate)
app.get('/launch/light/:text', svgtemplate)
app.get('/launch.svg', svgtemplate)
app.get('/launch/:text', svgtemplate)
app.get('/counter/:id', svgtemplate)

//Counter
app.get('/r/:id', function (req, res, next)
{
  var id = req.params.id || '123'
  var url = req.query.url || config.get('DEFAULT_LAUNCH_URL')
  //emit event w/ timestamp
  //write to log / db in event handler
  console.log("launch: { id: \""+id+"\", url: \""+url+"\" }");
  res.header('Location', url);
  res.send(302);
})

// Input form:
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
