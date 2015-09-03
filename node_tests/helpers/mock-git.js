var Promise = require('ember-cli/lib/ext/promise');
var nodegit = require('nodegit');

var mock = Object.create(nodegit);

mock.Remote = remoteMock = {
  called: null,
  create: function(repo, remote, repositoryURL){
    nodegit.Remote.create(repo, remote, repositoryURL)
    remoteMock.repo = repo;
    return remoteMock;
  },
  push: function() {
    remoteMock.called = arguments;
    return remoteMock;
  },
  setCallbacks: function() {
    
  }
}

module.exports = mock;
