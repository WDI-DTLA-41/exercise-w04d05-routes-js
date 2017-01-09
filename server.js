var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
app.use(bodyParser());

// When a user visits the root of your application
// the user should see...
// - the text "Hello and Welcome!" and a
// - link with the text "Right this way"

app.get('/', (req, res) => {
  var text = 'Hello and Welcome!',
      link = '<a href=\'/rabbit_hole\' alt=\'This Way\'>Right this way</a>',
      html1 = text + '<br>' + link,
      html = '<div style="text-align: center; line-height: 100px">' + html1 + '</div>'
  res.send(html);
})

// When a user clicks on "Right this way"
// - the URL should change to "/rabbit_hole" and
// the user should see...
// - the text "I'm running late!" and a
// - link with the text "Off with their head!"

app.get('/rabbit_hole', (req, res) => {
  var text = 'I\'m running late!',
      link = '<a href=\'/off_with_their?part=head\'>Off with their head!';
      res.send(text + '<br>' + link);
})

// When a user clicks on "Off with their head!"
// - the URL should change to "/off_with_their?part=head" and
// the user should see...
// - "Off with their head!"

// app.get('/off_with_their?part=head', (req, res) => {
//   var query = req.query.part;
//   var text = 'Off with their ' + query + '!';
     // res.send(text);
// })

// If a user changed the URL in the url bar to "/off_with_their?part=[ANY]"
// for example "/off_with_their?part=pants"
// then the user should see...
// - "Off with their pants!"

app.get('/off_with_their', (req, res) => {
  var query = req.query.part
  var text = 'Off with their ' + query + '!';
      res.send(text);
})

// When a user visits "/characters/hatter"
// the user should see...
// - the text "have a cuppa"

app.get('/characters/hatter', (req, res) => {
  var text = 'have a cuppa';
      res.send(text);
})

// When the user visits "/characters/queen"
// then the URL should change to "/off_with_their?part=head"
// and the user should see...
// - "Off with their head!"

app.get('/characters/queen', (req, res) => {
      res.redirect(301, '/off_with_their?part=head');
})

// When the user visits "/elevator" then
// - they should see an input field and
// - they should see a button that says "Go!"

app.get('/elevator', (req, res) => {
  // var form = '<form> Floor: <input type="text"> <button type="button">Go!</button> </form>';
   var html = '<form action="/floor">Floor:' +
               '<input type="text" name="number" placeholder="Which floor, sir?" />' +
               '<button type="submit">Go!</button>' +
            '</form>';
  res.send(html);
});

// When the user enters a number (let's say 5) in the input field and
// - clicks "Go!"
// - the url should change to "/floor?number=5"
// - and the user should see "Floor number 5"

app.get('/floor', function(req, res){
  var query = req.query.number;
  var html = 'Floor number ' + query;
  res.send(html);
});

// When the user visits "/characters/cheshire_cat" then
// - they should see an input form and radio buttons
// - and the buttons should say "show" and "hide"
// - and a button that says "submit"

app.get('/characters/cheshire_cat', (req, res) => { // method="post">
  var html = '<form action="/dumb_waiter" method="post">' +
                '<input type="radio" name="visit" value="show" id="radio">' +
                '<label for="radio">Show</label>' +
                '<input type="radio" name="visit" value="hide" id="radio">' +
                '<label for="radio">Hide</label><br>' +
                '<button type="submit">Submit</button>' +
              '</form>';
  res.send(html);
})

// When a user selects "show" and clicks "submit"
// - then a POST request should be sent to "/dumb_waiter"
// - and then we should redirect to "/curious?visit=show"
// - and we should see the text "=^..^="

app.post('/dumb_waiter', (req, res) => {
  var radioVal = req.body.visit;
  res.redirect(301, '/curious?visit=' + radioVal);
})

app.get('/curious', (req, res) => {
  var query = req.query.visit;
  if (query === 'show') {
    res.send("=^..^=");
  }
  if (query === 'hide') {
    res.send(":)");
  }
})

// When a user selects "hide" and clicks "submit"
// - then a POST request should be sent to "/dumb_waiter"
// - and then we should redirect to "/curious?visit=hide"
// - and we should see the text ":)"

// Start Server
var port = 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
