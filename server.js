var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 3000;

app.use(bodyParser.urlencoded({entended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  var welcome = '<h1>Hello and Welcome!</h1>';
  var link = '<a href="/rabbit_hole">Right this way</a>';
  res.send(welcome + link);
});

app.get('/rabbit_hole', function(req, res) {
  var late = "<p>I'm running late!</p>";
  var link = '<a href="/off_with_their?part=head">Off with their head!</a>';
  res.send(late + link);
});

app.get('/off_with_their', function(req, res) {
  var head = '<p>Off with their ' + req.query.part +'!</p>';
  res.send(head);
});

app.get('/characters/hatter', function(req, res) {
  res.send('<p>have a cuppa</p>');
});

app.get('/characters/queen', function(req, res) {
  res.send('/off_with_their?part=head');
});

app.get('/elevator', function(req, res) {
  if (req.query.number) {
  res.redirect('/floor?number=' + req.params.number);
  }
  res.send('<form action="/floor" method="get"><input type="text" name="number"> <input type="submit" value="Go!"></form>');
});

app.get('/floor', function(req, res) {
  res.send('<p>Floor number ' + req.query.number + '</p>');
})

app.get('/characters/cheshire_cat', function(req, res) {
  var inputShow = '<input type="radio" name="visit" value="show"> show<br>';
  var inputHide = '<input type="radio" name="visit" value="hide"> hide<br>';
  var inputSubmit = '<input type="submit" value="Submit">';
  res.send('<form action="/dumb_waiter" method="post">' + inputShow + inputHide + inputSubmit + '</form>');
});

app.post('/dumb_waiter', function(req, res) {
  if (req.body.visit === "show") {
    res.redirect('/curious?visit=show');
  }
  if (req.body.visit === 'hide') {
    res.redirect('/curious?visit=hide');
  }
});

app.get('/curious', function(req, res) {
  if (req.query.visit === 'show') {
    res.send('<h1>=^..^=</h1>');
  }
   if (req.query.visit === 'hide') {
    res.send('<h1>:)</h1>');
   }
});

app.listen(port, function() {
  console.log('Server running on port ' + port);
});
