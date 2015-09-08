var CoreObject  = require('core-object');
var path        = require('path');

module.exports = CoreObject.extend({
  init: function(options) {
    this._plugin = options.plugin;
  },

  upload: function(distDir) {
    var repo, index, signature;

    var self       = this;
    var branch     = this._plugin.readConfig('branch');
    var repository = this._plugin.readConfig('repository');
    var git        = this._plugin.readConfig('gitClient');
    var distDir    = this._plugin.readConfig('distDir');
    var isBare     = 0;

    distDir = path.resolve(distDir);

    this._plugin.log('initializing a git repository in ' + distDir)

    return git.Repository.init(distDir, isBare)
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
        return index.addAll(distDir, 0);
      })
      .then(function() {
        self._plugin.log('✔ added files to index' )
        index.write();
        return index.writeTree();
      })
      .then(function(oid) {
        var now = new Date().toISOString();
        return repo.createCommit("HEAD", signature, signature, "Updated at " + now, oid, []);
      }).then(function(oid) {
        self._plugin.log('✔ new commit created #' + oid )
        return git.Remote.create(repo, 'origin', repository);
      }).then(function(remote) {
        createdMessage = '✔ new remote named origin created with push url '+ repository;
        existingMessage = 'looking for origin remote';
        self._plugin.log(remote ? createdMessage : existingMessage);
        return remote ? remote : git.Remote.lookup(repo, 'origin');
      }).then(function(remote) {
        remote.setCallbacks({
          credentials: function(url, userName) {
            return git.Cred.sshKeyFromAgent(userName);
          }
        });

        return remote.push(
          ["+refs/heads/master:refs/heads/" + branch],
          null,
          repo.defaultSignature(),
          "Push to " + branch);
        }).then(function() {
          self._plugin.log('✔ pushed to ' + repository + ' branch ' + branch);
        });
      }
  });
