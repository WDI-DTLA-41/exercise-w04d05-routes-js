var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser());

app.get('/', function(req, res){
  var text = "<h1>Hello and Welcome!</h1>";
  var link = "<a href='/rabbit_hole'>Right this way</a>"
  res.send(text + link);
})

app.get('/rabbit_hole', function(req, res){
  var text = "<h1>I'm Running Late!</h1>";
  var link = "<a href='off_with_their?part=head'>Off with their head!</a>"
  res.send(text + link);
})

app.get('/off_with_their', function(req, res) {
  var part = req.query.part;
  var text = "<p>Off with their " + req.query.part + "</p>";
  res.send(text);
})

app.get('/characters/hatter', function(req, res) {
  var text = "<h1>Have a cuppa</h1>";
  res.send(text);
})

app.get('/characters/queen', function(req, res) {
  res.redirect(301, '/off_with_their?part=head')
})

app.get('/elevator', function(req, res){
  var html = "<form action='/floor'><input type='text' name='number'><input type='submit' value='Go!'></form>";
  res.send(html);
})

app.get('/floor', function(req, res){
  var text = "Floor number " + req.query.number;
  res.send(text);
})

app.get('/characters/cheshire_cat', function(req, res){
  var html = "<form method = 'post' action='/dumb_waiter'><input type='radio' name='visit' value='show'>Show<br><input type='radio' name='visit' value='hide'>Hide<br><input type='submit' value='submit'></form>";
  res.send(html);
})

app.post('/dumb_waiter', function(req, res){
  var show = req.body.visit;
  res.redirect(301, '/curious?visit=' + show);
})

app.get('/curious', function(req, res){
  if (req.query.visit === 'show') {
    var text = "=^..^=";
    res.send(text);
  }
  if (req.query.visit === 'hide') {
    var text = ":)";
    res.send(text);
  }
})

var port = 3000;
app.listen(port, function(){
  console.log('Listening on Port ' + port);
});

// <form method="POST" action="/">
//     <input type="text" name="name">
//     <button>Submit</button>
//   </form>
