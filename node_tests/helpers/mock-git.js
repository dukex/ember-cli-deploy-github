var Promise = require('ember-cli/lib/ext/promise');
var nodegit = require('nodegit');

var mock = Object.create(nodegit);

mock.Remote = gitMock = remoteMock = {
  called: null,
  create: function(repo, remote, repositoryURL){
    nodegit.Remote.create(repo, remote, repositoryURL)
    global.gitMock.repo = repo;
    return remoteMock;
  },
  push: function() {
    global.gitMock.called = arguments;
    return remoteMock;
  },
  setCallbacks: function() {

  }
}

module.exports = mock;
