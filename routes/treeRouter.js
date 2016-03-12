var fs = require('fs');
var Router = require(__dirname + '/../lib/router.js');

var treeRouter = module.exports = new Router();
var Species = require(__dirname + '/../lib/tree/species.js');
var plz = require(__dirname+'/../lib/responder.js');


treeRouter.get('/trees', (req, res) => {
  console.log('GET request for '+req.url);

  var id = req.url.split('/')[2];
  console.log(id);

  // if (!id) return treeRouter.respond(res, 200, '<h2>welcome to the parking lot</h2>');


  fs.readFile(__dirname + '/../data/speciess.json', (err, data) => {
    var species;
    if (err) return treeRouter.respondErr(res, 500, 'error reading from species.json')
    else {
      var speciess = JSON.parse(data).speciess.map((d) => new Species(d));

      if (!id) return treeRouter.respond(res, 200, plz.listAll(speciess));

      var matches = speciess.filter((species)=> {
        return species.id === id;
      });
      species = matches[0] || {'id':'park_bench'};
    }

    console.log(species);
    return treeRouter.respond(res, 200, '<h1>'+species.name+'</h1>');

    // res.writeHead(200, {'content-type': 'text/html'});
    // res.write('here is your tree:');
    // res.write('<h1>'+species.id+'</h1>');
    // res.end();
  });
});

treeRouter.post('/trees', (req, res) => {
  console.log('POST request for '+req.url);

  var id = req.headers.name.replace(" ", "_");

  fs.readFile(__dirname + '/../data/speciess.json', (err, data) => {
    if (err) return treeRouter.respondErr(res, 500, "error reading from species.json");
    var speciess = JSON.parse(data).speciess;

    //keep speciess unique
    if (speciess.filter((s) => s.id === id).length) return treeRouter.respond(res, 200);

    var species = {"id":id}
    speciess.push(species);
    console.log({"speciess":speciess});

    fs.writeFile(__dirname + '/../data/speciess.json', JSON.stringify({"speciess":speciess}), (err) => {
      console.log(`WRITE ${id} to speciess.json`);
      if (err) return treeRouter.respondErr(res, 500, "error writing to species.json");
      return treeRouter.respond(res, 200);
    });

  });

  // fs.readdir(__dirname + '/../trees', (err, files) => {
  //   if (err) {
  //     res.writeHead(500, {'content-type': 'text/html'});
  //     res.end();
  //   }
  //   var tree = {id: files.length, name: req.headers.name};
  //
  //   fs.writeFile(__dirname + '/../trees/tr'+files.length+'.json', JSON.stringify(tree), (err) => {
  //     if (err) res.writeHead(500, {'content-type': 'text/html'});
  //     else res.writeHead(200, {'content-type': 'text/html'});
  //     res.end();
  //   });
  // });

});
