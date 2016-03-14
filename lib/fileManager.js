var fs = require('fs');

exports.create = function(resource, obj, fn) {

  fs.readFile(__dirname + '/../data/'+resource+'.json', (err, data) => {
    if (err) fn(err, {'status':500, 'msg':`error writing to ${resource}.json`});  //this.router.respondErr(res, 500, "error reading from trees.json");

    var objs = JSON.parse(data)[resource];

    //keep resource unique
    if (objs.filter((o) => o.id === obj.id).length) fn(null, {'status':200});//{this.router.respond(res, 200)};
    objs.push(obj);

    var toJSON = {};
    toJSON[resource] = objs;
    fs.writeFile(__dirname + '/../data/'+resource+'.json', JSON.stringify(toJSON), (err) => {
      console.log(`WRITE ${obj.id} to ${resource}.json`);
      if (err) fn(err, {'status':500, 'msg':`error writing to ${resource}.json`});  //this.router.respondErr(res, 500, `error writing to ${resource}.json`);
      fn(null, {'status':200});
    });
  });

};
