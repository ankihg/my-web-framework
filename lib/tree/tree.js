var Tree = module.exports = function(tmp) {
  this.speciesID = tmp.speciesID;
  this.lat = tmp.lat;
  this.lng = tmp.lng;
};

Tree.prototype.name = function() {
  return `${this.speciesID.replace("_", " ")} @ lat: ${this.lat || 'x'} lng: ${this.lng || 'x'}`;
};

Tree.prototype.listHTML = function() {
  return this.name();
}
