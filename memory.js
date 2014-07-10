/**
 * modella-memory
 *
 * Memory persistence layer for [Modella](https://github.com/modella/modella/).
 * Useful for development or as a reference implementation for Modella storage
 * plugins.
 *
 * @link https://github.com/alexmingoia/modella-memory
 * @author Alex Mingoia <talk@alexmingoia.com>
 */

/**
 * Export `memory`
 */

var memory = module.exports = function() {
  return function(Model) {
    // Container for model instances
    Model.store = {
      __autoIncrement: 1
    };
    Model.save = memory.save;
    Model.update = memory.update;
    Model.remove = memory.remove;
    Model.find = Model.get = memory.find;
    Model.all = memory.all;
    return Model;
  };
};

/**
 * Save.
 *
 * @param {Function(err, attrs)} fn
 * @api private
 */

memory.save = function(fn) {
  var store = this.model.store;
  if (!this.model.primaryKey) return fn(new Error("No primary key set on model"));
  if (!(this.primary())) {
    var setDoc = {};
    setDoc[this.model.primaryKey] = store.__autoIncrement;
    this.set(setDoc);
    store.__autoIncrement++;
  }
  store[this.primary()] = this;
  fn(null, this.toJSON());
};

/**
 * Update.
 *
 * @param {Function(err, attrs)} fn
 * @api private
 */

memory.update = memory.save;

/**
 * Remove.
 *
 * @param {Function(err)} fn
 * @api private
 */

memory.remove = function(fn) {
  var id = this.primary();
  if (!this.model.store[id]) {
    return fn(new Error("Can't find " + this.modelName + " with id: " + id));
  }
  delete this.model.store[id];
  fn();
};

/**
 * Find model by given `id`.
 *
 * @param {Mixed} id
 * @param {Function(err, model)} fn
 * @api public
 */

memory.find = function(id, fn) {
  if (!this.store[id]) {
    return fn(new Error("Can't find " + this.modelName + " with id: " + id));
  }
  fn(null, this.store[id]);
};

/**
 * Get all models.
 *
 * @param {Function(err, collection)} fn
 * @api public
 */

memory.all = function(fn) {
  var results = [];
  for (var id in this.store) {
    if (this.store.hasOwnProperty(id) && id !== '__autoIncrement') {
      results.push(this.store[id]);
    }
  }
  fn(null, results);
};
