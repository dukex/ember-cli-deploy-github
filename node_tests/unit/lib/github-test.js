var chai = require('chai');
var GithubAdapter = require('../../../lib/github');
var NodeGit = require('nodegit');
var fs = require('fs');

var expect = chai.expect;

var githubAdapter,
    mock;

var testPath = '.repo';

describe('GithubAdapter', function() {
  beforeEach(function(done) {
    mock = require('../../helpers/mock-git');
    githubAdapter = new GithubAdapter({
      path: testPath,
      git: mock,
      config: {
        assets: {
          repository: "git@git.com/my-repo"
        }
      }
    });

    require('rimraf')(testPath, function(){
      fs.mkdirSync(testPath);
      fs.writeFile(testPath + '/test-file', "Test File!", done);
    });
  });

  it('creates a repository with files committed', function(){
    return githubAdapter.upload().then(function(){
      return NodeGit.Repository.open(testPath);
    }).then(function(repo){
      return repo.getHeadCommit();
    }).then(function(commit){
      expect(commit.message()).to.include('Updated at');
      return commit.getEntry('test-file');
    }).then(function(entry) {
      expect(entry.isFile()).to.be.ok;
    });
  });

  it('set origin remote as configured', function() {
    return githubAdapter.upload().then(function(){
      return NodeGit.Repository.open(testPath);
    }).then(function(repo) {
      return NodeGit.Remote.lookup(repo, 'origin');
    }).then(function(remote){
      expect(remote.url()).to.eq(githubAdapter.config.assets.repository);
    });
  });

  it('pushs to repository in configured branch', function() {
    return githubAdapter.upload().then(function(remote){
      var branch = remote.called[0][0];
      var options = remote.called[1];
      var signature = remote.called[2];
      var message = remote.called[3];
      expect(branch).to.eq('+refs/heads/master:refs/heads/gh-pages');
      expect(options).to.eq(null);
      expect(signature).to.eql(remote.repo.defaultSignature());
      expect(message).to.eq('Push to master');
    });
  });
});
