module.exports =function(target) {
  var ENV = {
    "github": {
      repository: "my-test-repo.git",
      gitClient: require('./helpers/mock-git')
    }
  };
  return ENV;
}
