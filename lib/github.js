var CoreObject  = require('core-object');
var SilentError = require('silent-error');
var path        = require('path');

module.exports = CoreObject.extend({
  init: function() {
    CoreObject.prototype.init.apply(this, arguments);

    if (!this.config) {
      throw new SilentError('You must set a config');
    }

    this.git  = this.git || require('nodegit');
    this.path = path.resolve(this.path || "./tmp/assets-sync");
  },

  _initRepository: function() {
    var isBare = 0;
    return this.git.Repository.init(this.path, isBare);
  },

  upload() {
    var _this = this;
    var repo, index, signature;
    return this._initRepository()
    .then(function(_repo) {
      repo = _repo;
      signature = repo.defaultSignature();
    })
    .then(function(){
      return repo.openIndex();
    })
    .then(function(idx) {
      index = idx;
      return index.read(1);
    })
    .then(function() {
      return index.addAll(_this.path, 0);
    })
    .then(function() {
      return index.write();
    })
    .then(function() {
      return index.writeTree();
    })
    .then(function(oid) {
      var now = new Date().toISOString();
      return repo.createCommit("HEAD", signature, signature, "Updated at " + now, oid, []);
    }).then(function() {
      return _this.git.Remote.create(repo, 'origin', _this.config.assets.repository);
    }).then(function(remote) {
      remote.setCallbacks({
        credentials: function(url, userName) {
          return NodeGit.Cred.sshKeyFromAgent(userName);
        }
      });

      var branch = _this.config.assets.branch || 'gh-pages';
      return remote.push(
          ["+refs/heads/master:refs/heads/" + branch],
          null,
          repo.defaultSignature(),
          "Push to master");
    });
    }
  });
