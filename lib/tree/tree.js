var Tree = module.exports = function(tmp) {
  this.id = `${tmp.speciesID.replace(" ", "_")}@${tmp.lat || 'x'}&${tmp.lng || 'x'}`;
  this.speciesID = tmp.speciesID;
  this.lat = tmp.lat;
  this.lng = tmp.lng;
  console.log(this.id);
};

Tree.prototype.name = function() {
  return `${this.speciesID.replace("_", " ")} @ lat: ${this.lat || 'x'} lng: ${this.lng || 'x'}`;
};

Tree.prototype.listHTML = function() {
  return `<a href=/trees/${this.id}>${this.name()}</a>`;
}
