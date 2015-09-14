module.exports =function(target) {
  var ENV = {
    "github": {
      repository: "git@github.com:dukex/tests.git",
      gitClient: require('./helpers/mock-git'),
      distDir: 'tmp/deploy-dist'
    }
  };
  return ENV;
}
