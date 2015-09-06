var Promise = require('ember-cli/lib/ext/promise');
var nodegit = require('nodegit');

var mock = Object.create(nodegit);

mock.Remote = gitMock = remoteMock = {
  called: null,
  create: function(repo, remote, repositoryURL){
    var result = nodegit.Remote.create(repo, remote, repositoryURL)
    global.gitMock.repo = repo;
    // return mock only when original create method returns something, it's necessary to emulate a empty retult
    return result ? remoteMock : result;
  },
  push: function() {
    global.gitMock.called = arguments;
    return remoteMock;
  },
  lookup: function (repo, remote) {
    return remoteMock;
  },
  setCallbacks: function(options) {
    if(options && options.credentials) {
      options.credentials(null, 'username');
    }
  }
}

module.exports = mock;
