var species = module.exports = function(tmp) {
  console.log('make new species');
  console.log(tmp);
  this.id = tmp.id;
  this.name = tmp.id.replace("_", " ");
};
