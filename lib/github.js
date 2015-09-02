var CoreObject   = require('core-object');
var Promise      = require('ember-cli/lib/ext/promise');
var NodeGit      = require("nodegit");
var SilentError = require('silent-error');

module.exports = CoreObject.extend({
  init() {
    CoreObject.prototype.init.apply(this, arguments);

    if (!this.config) {
      throw new SilentError('You must supply a config');
    }

    console.log(this.config.assets)
  },
  upload() {
    var pathToRepo = require("path").resolve("./tmp/assets-sync");
    var isBare = 0;
    var signature, repo, index;
    var self = this;
    return NodeGit.Repository.init(pathToRepo, isBare).then(function (_repo) {
      repo = _repo;
      signature = repo.defaultSignature();
    })
    .then(function(){ return repo.openIndex(); })
    .then(function(idx) {
      index = idx;
      return index.read(1);
    })
    .then(function() { return index.addAll(pathToRepo, 0); })
    .then(function() { return index.write(); })
    .then(function() { return index.writeTree(); }).then(function(oid) {
      var now = new Date().toISOString();
      return repo.createCommit("HEAD", signature, signature, "Updated at " + now, oid, []);
    }).then(function(commitId) {
      return NodeGit.Remote.create(repo, 'origin', self.config.assets.repository);
    }).then(function(remote) {
      remote.setCallbacks({
        credentials: function(url, userName) {
          return NodeGit.Cred.sshKeyFromAgent(userName);
        }
      });
      var branch = self.config.assets.branch || 'gh-pages';
      return remote.push(
        ["+refs/heads/master:refs/heads/" + branch],
        null,
        repo.defaultSignature(),
        "Push to master");
      });
    }
  });
