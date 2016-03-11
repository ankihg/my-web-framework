var fs = require('fs');
var Router = require(__dirname + '/../lib/router.js');

var treeRouter = module.exports = new Router();

treeRouter.get('/trees', (req, res) => {
  var id = req.url.split('/')[2];

  if (!id) {
    res.writeHead(500, {'content-type': 'text/html'});
    res.write('<h2>welcome to the parking lot</h2>');
    return res.end();
  }

  fs.readFile(__dirname + '/../trees/tr'+id+'.json', (err, data) => {
    var tree;
    if (err) tree = {'name':'park bench'};
    else tree = JSON.parse(data);

    res.writeHead(200, {'content-type': 'text/html'});
    res.write('here is your tree:');
    res.write('<h1>'+tree.name+'</h1>');
    res.end();
  });
});

treeRouter.post('/trees', (req, res) => {

  fs.readdir(__dirname + '/../trees', (err, files) => {
    if (err) {
      res.writeHead(500, {'content-type': 'text/html'});
      res.end();
    }
    var tree = {id: files.length, name: req.headers.name};

    fs.writeFile(__dirname + '/../trees/tr'+files.length+'.json', JSON.stringify(tree), (err) => {
      if (err) res.writeHead(500, {'content-type': 'text/html'});
      else res.writeHead(200, {'content-type': 'text/html'});
      res.end();
    });
  });

});
