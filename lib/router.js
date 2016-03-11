var Router = module.exports = function() {

  this.routes = {
    'GET': {},
    'POST': {}
  };

};

Router.prototype.get = function(route, cb) {
  this.routes.GET[route] = cb;
};

Router.prototype.post = function(route, cb) {
  this.routes.POST[route] = cb;
};

Router.prototype.route = function(req, res) {
  try {
    var resource = req.url.split('/')[1];
    this.routes[req.method]['/'+resource](req, res);
  } catch (err) {
    console.log('no route hit return 404');
    res.writeHead(404, {'content-type': 'text/html'});
    res.write('<h1>im lost</h1>');
    res.end();
  }
};
