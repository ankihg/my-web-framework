var fs = require('fs');
var Router = require(__dirname + '/../lib/router.js');

var treeRouter = module.exports = new Router();
var Species = require(__dirname + '/../lib/tree/species.js');
var Tree = require(__dirname + '/../lib/tree/tree.js')


treeRouter.get('/speciess', (req, res) => {
  console.log('GET request for '+req.url);

  var id = req.url.split('/')[2];
  treeRouter.fm.read('speciess', id, Species, (err, fileReport) => {
      if (err) return treeRouter.respondErr(res, 500, fileReport.msg);
      if (fileReport.delivery) return treeRouter.respond(res, 200, `<h1>${fileReport.delivery.name()}</h1>`);
      if (fileReport.all) return treeRouter.respond(res, 200, `<h2>${treeRouter.plz.listAll(fileReport.all)}</h2>`);
  });
});

treeRouter.post('/speciess', (req, res) => {
  console.log('POST request for '+req.url);
  treeRouter.fm.create('speciess', new Species(req.headers), (err, fileReport) => {
    if (err) return treeRouter.respondErr(res, 500, fileReport.msg);
    treeRouter.respond(res, fileReport.status);
  });
});

treeRouter.put('/speciess',(req, res) => {
  console.log('PUT request for '+req.url);
  var id = req.url.split('/')[2];

  treeRouter.fm.update('speciess', id, req.headers.update, Species, (err, fileReport) => {
    if (err) return treeRouter.respondErr(res, 500, fileReport.msg);
    treeRouter.respond(res, fileReport.status);
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
  treeRouter.fm.read('trees', id, Tree, (err, fileReport) => {
      if (err) return treeRouter.respondErr(res, 500, fileReport.msg);
      if (fileReport.delivery) return treeRouter.respond(res, 200, '<h1>'+fileReport.delivery.name()+'</h1>');
      if (fileReport.all) return treeRouter.respond(res, 200, `<h2>${treeRouter.plz.listAll(fileReport.all)}</h2>`);
  });

});


treeRouter.post('/trees', (req, res) => {
  console.log('POST request for '+req.url);
  treeRouter.fm.create('trees', new Tree(req.headers), (err, fileReport) => {
    if (err) return treeRouter.respondErr(res, 500, fileReport.msg);
    treeRouter.respond(res, fileReport.status);
  });
});

treeRouter.put('/trees',(req, res) => {
  console.log('PUT request for '+req.url);
  var id = req.url.split('/')[2];

  treeRouter.fm.update('trees', id, req.headers.update, Tree, (err, fileReport) => {
    if (err) return treeRouter.respondErr(res, 500, fileReport.msg);
    treeRouter.respond(res, fileReport.status);
  });

});

treeRouter.del('/trees', (req, res) => {
  console.log('DEL request for '+req.url);
  var id = req.url.split('/')[2];
  if (!id) return treeRouter.respond(res, 200);

  fs.readFile(__dirname + '/../data/trees.json', (err, data) => {
    if (err) return treeRouter.respondErr(res, 500, 'error reading from trees.json');
    var trees = JSON.parse(data).trees.map((d) => new Tree(d));

    //remove species with id from speciess
    trees.forEach((tree, i, arr) => { if (tree.id === id) arr.splice(i, 1);  });

    fs.writeFile(__dirname + '/../data/trees.json', JSON.stringify({"trees":trees}), (err) => {
      if (err) return treeRouter.respondErr(res, 500, 'error writing to trees.json');
      console.log(`DELETE ${id} from trees.json`);
      return treeRouter.respond(res, 200);
    });

  });
});
