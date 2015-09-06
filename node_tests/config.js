module.exports =function(target) {
  var ENV = {
    "github": {
      repository: "git://repo/my-test-repo.git",
      gitClient: require('./helpers/mock-git'),
      distDir: 'tmp/deploy-dist'
    }
  };
  return ENV;
}
