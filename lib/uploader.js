var CoreObject  = require('core-object');
var path        = require('path');

module.exports = CoreObject.extend({
  init: function(git, context) {
    CoreObject.prototype.init(context);
    this.path = path.resolve(this.distDir || "./tmp/assets-sync");
    this.git = git;
  },

  _initRepository: function() {
    var isBare = 0;
    return this.git.Repository.init(this.path, isBare);
  },

  upload: function() {
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
        index.write();
        return index.writeTree();
      })
      .then(function(oid) {
        var now = new Date().toISOString();
        return repo.createCommit("HEAD", signature, signature, "Updated at " + now, oid, []);
      }).then(function() {
        return _this.git.Remote.create(repo, 'origin', _this.config.github.repository);
      }).then(function(remote) {
        remote.setCallbacks({
          credentials: function(url, userName) {
            return NodeGit.Cred.sshKeyFromAgent(userName);
          }
        });

        var branch = _this.config.github.branch;
        return remote.push(
          ["+refs/heads/master:refs/heads/" + branch],
          null,
          repo.defaultSignature(),
          "Push to master");
        });
      }
  });
