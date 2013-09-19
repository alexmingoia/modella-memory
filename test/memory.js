/**
 * modella-memory tests
 */

var modella = require('../node_modules/modella');
var should = require('should');

describe('module', function() {
  it('should export plugin function', function(done) {
    var memory = require('..');
    should.exist(memory);
    memory.should.be.a('function');
    var plugin = memory();
    should.exist(plugin);
    plugin.should.be.a('function');
    done();
  });
});

describe('plugin', function() {
  var memory = require('..');
  var User = modella('User').use(memory()).attr('id');

  it('should extend Model with Model.save', function(done) {
    User.should.have.property('save');
    User.save.should.be.a('function');
    done();
  });
  it('should extend Model with Model.update', function(done) {
    User.should.have.property('update');
    User.update.should.be.a('function');
    done();
  });
  it('should extend Model with Model.remove', function(done) {
    User.should.have.property('remove');
    User.remove.should.be.a('function');
    done();
  });

  it('should extend Model with Model.all', function(done) {
    User.should.have.property('all');
    User.all.should.be.a('function');
    done();
  });
  it('should extend Model with Model.find', function(done) {
    User.should.have.property('find');
    User.find.should.be.a('function');
    done();
  });
});

describe('Model', function(done) {
  var memory = require('..');
  var User = modella('User').use(require('..')()).attr('id');

  afterEach(function(done) {
    User.store = { __autoIncrement: 1 };
    done();
  });

  describe('.save()', function() {
    it('should save instance to storage successfully', function(done) {
      var user = new User();
      user.save(function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  describe('.remove()', function() {
    it('should remove instance from storage successfully', function(done) {
      var user = new User();
      user.save(function(err) {
        should.not.exist(err);
        user.remove(function(err) {
          should.not.exist(err);
          done();
        });
      });
    });
    
    it('should pass error on failure', function(done) {
      var user = new User();
      user.remove(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  describe('.all()', function() {
    it('should find all instances successfully', function(done) {
      var user1 = new User();
      var user2 = new User();
      user1.save(function(err) {
        user2.save(function(err) {
          User.all(function(err, users) {
            should.not.exist(err);
            should.exist(users);
            users.should.be.instanceOf(Array);
            users.length.should.be.above(0);
            users[0].attrs.id.should.equal(user1.id());
            done();
          });
        });
      });
    });
  });

  describe('.find()', function() {
    it('should find instance by id successfully', function(done) {
      done();
    });
  });
});
