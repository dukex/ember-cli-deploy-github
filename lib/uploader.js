var CoreObject  = require('core-object');
var path        = require('path');

module.exports = CoreObject.extend({
  init: function(git, config, log) {
    this.repository = config.repository;
    this.branch = config.branch;
    this.git = git;
    this.log = log;
  },

  _initRepository: function() {
    var isBare = 0;
    this.log('initializing a git repository in ' + this.path)
    return this.git.Repository.init(this.path, isBare);
  },

  upload: function(distDir) {
    var repo, index, signature;

    var self  = this;
    self.path = path.resolve(distDir);

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
        return index.addAll(self.path, 0);
      })
      .then(function() {
        self.log('✔ added files to index' )
        index.write();
        return index.writeTree();
      })
      .then(function(oid) {
        var now = new Date().toISOString();
        return repo.createCommit("HEAD", signature, signature, "Updated at " + now, oid, []);
      }).then(function(oid) {
        self.log('✔ new commit created #' + oid )
        return self.git.Remote.create(repo, 'origin', self.repository);
      }).then(function(remote) {
        createdMessage = '✔ new remote named origin created with push url '+ self.repository;
        existingMessage = 'looking for origin remote';
        self.log(remote ? createdMessage : existingMessage);
        return remote ? remote : self.git.Remote.lookup(repo, 'origin');
      }).then(function(remote) {
        remote.setCallbacks({
          credentials: function(url, userName) {
            return self.git.Cred.sshKeyFromAgent(userName);
          }
        });

        var branch = self.branch;
        return remote.push(
          ["+refs/heads/master:refs/heads/" + branch],
          null,
          repo.defaultSignature(),
          "Push to " + branch);
        }).then(function() {
          self.log('✔ pushed to ' + self.repository + ' branch ' + self.branch);
        });
      }
  });
