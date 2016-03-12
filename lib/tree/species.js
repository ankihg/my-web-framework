var Species = module.exports = function(tmp) {
  console.log('make new species');
  console.log(tmp);
  this.id = tmp.id;
  this.name = tmp.id.replace("_", " ");
};

Species.prototype.listHTML = function() {
  return `<a href='/trees/${this.id}'>${this.name}</a>`;
};
