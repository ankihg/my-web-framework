var Tree = module.exports = function(tmp) {
  this.id = tmp.id;
  // this.id = `${tmp.speciesID.replace(" ", "_")}@${tmp.lat || 'x'}&${tmp.lng || 'x'}`;
  // this.speciesID = tmp.speciesID || tmp.speciesid;
  // this.lat = tmp.lat;
  // this.lng = tmp.lng;
  console.log(this.id);
};

Tree.prototype.speciesID = function() {
  return this.id.split('@')[0];
};

Tree.prototype.lat = function() {
  return this.id.split('@')[1].split('&')[0];
};

Tree.prototype.lng = function() {
  return this.id.split('@')[1].split('&')[1];
};

Tree.prototype.name = function() {
  return `<a href=/speciess/${this.speciesID()}>${this.speciesID().replace("_", " ")}</a> @ lat: ${this.lat() || 'x'} lng: ${this.lng() || 'x'}`;
};

Tree.prototype.listHTML = function() {
  return `<a href=/trees/${this.id}>${this.name()}</a>`;
};
