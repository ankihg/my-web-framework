var fs = require('fs');
var Router = require(__dirname + '/../lib/router.js');

var treeRouter = module.exports = new Router();
var Species = require(__dirname + '/../lib/tree/species.js');
var Tree = require(__dirname + '/../lib/tree/tree.js')
var plz = require(__dirname+'/../lib/responder.js');


treeRouter.get('/speciess', (req, res) => {
  console.log('GET request for '+req.url);

  var id = req.url.split('/')[2];
  console.log(id);

  // if (!id) return treeRouter.respond(res, 200, '<h2>welcome to the parking lot</h2>');


  fs.readFile(__dirname + '/../data/speciess.json', (err, data) => {
    if (err) return treeRouter.respondErr(res, 500, 'error reading from species.json')
    var speciess = JSON.parse(data).speciess.map((d) => new Species(d));

    if (!id) return treeRouter.respond(res, 200, `<h2>${plz.listAll(speciess)}</h2>`);

    var matches = speciess.filter((species)=> {
      return species.id === id;
    });
    var species = matches[0] || new Species({'id':'park_bench'});

    return treeRouter.respond(res, 200, '<h1>'+species.name()+'</h1>');
  });
});

treeRouter.post('/speciess', (req, res) => {
  console.log('POST request for '+req.url);

  var id = req.headers.name.replace(" ", "_");

  fs.readFile(__dirname + '/../data/speciess.json', (err, data) => {
    if (err) return treeRouter.respondErr(res, 500, "error reading from species.json");
    var speciess = JSON.parse(data).speciess;

    //keep speciess unique
    if (speciess.filter((s) => s.id === id).length) return treeRouter.respond(res, 200);

    var species = {"id":id}
    speciess.push(species);

    fs.writeFile(__dirname + '/../data/speciess.json', JSON.stringify({"speciess":speciess}), (err) => {
      console.log(`WRITE ${id} to speciess.json`);
      if (err) return treeRouter.respondErr(res, 500, "error writing to species.json");
      return treeRouter.respond(res, 200);
    });

  });
});

treeRouter.put('/speciess',(req, res) => {
  console.log('PUT request for '+req.url);
  var id = req.url.split('/')[2];

  fs.readFile(__dirname + '/../data/speciess.json', (err, data) => {
    // var species;
    if (err) return treeRouter.respondErr(res, 500, 'error reading from species.json')

    var speciess = JSON.parse(data).speciess.map((d) => new Species(d));

    if (!id) return treeRouter.respond(res, 200);

    //update id matches to update
    speciess.forEach((species, i, arr) => { if (species.id === id) arr[i] = new Species(JSON.parse(req.headers.update));  });

    fs.writeFile(__dirname + '/../data/speciess.json', JSON.stringify({"speciess":speciess}), (err) => {
      if (err) return treeRouter.respondErr(res, 500, "error writing to species.json");
      console.log(`WRITE ${id} to speciess.json`);
      return treeRouter.respond(res, 200);
    });


    return treeRouter.respond(res, 200);
  });
});

treeRouter.del('/speciess', (req, res) => {
  console.log('DEL request for '+req.url);
  var id = req.url.split('/')[2];
  if (!id) return treeRouter.respond(res, 200);

  fs.readFile(__dirname + '/../data/speciess.json', (err, data) => {
    if (err) return treeRouter.respondErr(res, 500, 'error reading from species.json');
    var speciess = JSON.parse(data).speciess.map((d) => new Species(d));

    //remove species with id from speciess
    speciess.forEach((species, i, arr) => { if (species.id === id) speciess.splice(i, 1);  });

    fs.writeFile(__dirname + '/../data/speciess.json', JSON.stringify({"speciess":speciess}), (err) => {
      if (err) return treeRouter.respondErr(res, 500, 'error writing to species.json');
      console.log(`DELETE ${id} from speciess.json`);
      return treeRouter.respond(res, 200);
    });

  });
});

treeRouter.get('/trees', (req, res) => {
  console.log('GET request for '+req.url);

  var id = req.url.split('/')[2];


  fs.readFile(__dirname + '/../data/trees.json', (err, data) => {
    if (err) return treeRouter.respondErr(res, 500, 'error reading from species.json')
    var trees = JSON.parse(data).trees.map((d) => new Tree(d));

    if (!id) return treeRouter.respond(res, 200, `<h2>${plz.listAll(trees)}</h2>`);

    var matches = trees.filter((tree)=> {
      return tree.id === id;
    });
    var tree = matches[0] || new Tree({'speciesID':'park_bench'});

    return treeRouter.respond(res, 200, '<h1>'+tree.name()+'</h1>');
  });
});

treeRouter.post('/trees', (req, res) => {
  console.log('POST request for '+req.url);

  var speciesID = req.headers.speciesid.replace(" ", "_");
  var lat = req.headers.lat;
  var lng = req.headers.lng;

  fs.readFile(__dirname + '/../data/trees.json', (err, data) => {
    if (err) return treeRouter.respondErr(res, 500, "error reading from trees.json");

    var tree = {"speciesID":speciesID, "lat":lat, "lng":lng};
    var trees = JSON.parse(data).trees;
    trees.push(tree);

    fs.writeFile(__dirname + '/../data/trees.json', JSON.stringify({"trees":trees}), (err) => {
      console.log(`WRITE ${speciesID} to trees.json`);
      if (err) return treeRouter.respondErr(res, 500, "error writing to trees.json");
      return treeRouter.respond(res, 200);
    });

  });
});

treeRouter.put('/trees',(req, res) => {
  console.log('PUT request for '+req.url);
  var id = req.url.split('/')[2];

  fs.readFile(__dirname + '/../data/trees.json', (err, data) => {
    // var species;
    if (err) return treeRouter.respondErr(res, 500, 'error reading from trees.json')

    var trees = JSON.parse(data).trees.map((d) => new Tree(d));

    if (!id) return treeRouter.respond(res, 200);

    //update id matches to update
    trees.forEach((tree, i, arr) => { if (tree.id === id) arr[i] = new Tree(JSON.parse(req.headers.update));  });

    fs.writeFile(__dirname + '/../data/trees.json', JSON.stringify({"trees":trees}), (err) => {
      if (err) return treeRouter.respondErr(res, 500, "error writing to trees.json");
      console.log(`WRITE ${id} to trees.json`);
      return treeRouter.respond(res, 200);
    });


    return treeRouter.respond(res, 200);
  });
});
