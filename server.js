var cc          = require('config-multipaas'),
    restify     = require('restify'),
    fs          = require('fs')

var launchthis  = require('./package.json').openshift.launch_url
var config      = cc().add({
      GA_KEY: process.env.GA_TRACKER || undefined,
      DEFAULT_BTN_TEXT: process.env.DEFAULT_BTN_TEXT || "LAUNCH ON",
      DEFAULT_LAUNCH_URL: process.env.LAUNCH_URL || launchthis }),
    app         = restify.createServer()

app.use(restify.queryParser())
app.use(restify.CORS())
app.use(restify.fullResponse())
app.use(restify.gzipResponse());

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

var tracker = function(key){
  //normalize input
  if(key){
    return "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,'script','//www.google-analytics.com/analytics.js','ga');\n" + 
    "ga('create', '"+key+"', 'auto');\n" + 
    "ga('send', 'pageview');</script>"
  }else{
    return ""
  }
}

var svgtemplate = function (req, res, next)
{
  var buttontext = cleanbuttontext(req.params.text)
  var svgtemplate = findtemplate(req.url)
  var data = fs.readFileSync(__dirname + '/static/img/'+svgtemplate+'.svg');
  console.log('button: {text: "'+buttontext+'", template: "'+svgtemplate+'"}')
  res.status(200);
  res.header('Content-Type', 'image/svg+xml');
  //res.cache()
  //res.header('Cache-Control', 'no-cache');
  //res.header('Expires', 'Mon, 17 Feb 2014 15:21:20 GMT');
  //res.header('Last-Modified', 'Mon, 17 Feb 2014 07:19:50 GMT');
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
  //res.end(data.toString().replace(/host:port/g, req.header('Host').replace( /\{\{GA-TRACKER}}/, tracker(config.get('GA_KEY')))));
  res.end(data.toString().replace(/host:port/g, req.header('Host')).replace( /\{\{GA-TRACKER\}\}/, tracker(config.get('GA_KEY'))));
});

app.get(/\/(css|js|img)\/?.*/, restify.serveStatic({directory: './static/'}));

app.listen(config.get('PORT'), config.get('IP'), function () {
  console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT') )
});
