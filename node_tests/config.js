module.exports =function(target) {
  var ENV = {
    "github": {
      repository: "my-test-repo.git"
    }
  };
  ENV.git = require('./helpers/mock-git');
  return ENV;
}
