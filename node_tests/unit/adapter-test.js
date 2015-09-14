var chai         = require('chai');
var adapter      = require('../..');
var expect       = chai.expect;
var UI           = require('ember-cli/lib/ui');
var PipelineTask = require('ember-cli-deploy/lib/tasks/pipeline');
var NodeGit      = require('nodegit');
var fs           = require('fs')

var pipeline;

var ui = new UI({
    inputStream: process.stdin,
    outputStream: process.stdout,
    writeLevel: 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR',
    ci: true
});

var testPath = 'tmp/deploy-dist';
var addon = adapter;
addon.pkg = { keywords: ['ember-cli-deploy-plugin'] };

describe('adapter', function() {
  describe('.createDeployPlugin', function() {
    beforeEach(function(done){
      pipeline = new PipelineTask({
        project: {
          root: process.cwd(),
          addons: [addon],
        },
        ui: ui,
        deployConfigPath: 'node_tests/config.js',
        hooks: ['configure',
          'setup',
          'willDeploy',
          'willBuild', 'build', 'didBuild',
          'willPrepare', 'prepare', 'didPrepare',
          'willUpload', 'upload', 'didUpload',
          'willActivate', 'activate', 'didActivate',
          'didDeploy',
          'teardown'
        ]
      });
      require('rimraf')(testPath, function(){
        fs.mkdirSync(testPath);
        fs.writeFile(testPath + '/test-file', "Test File!", done);
      });
    });

    it("correct configure", function() {
      var plugin = adapter.createDeployPlugin({name: 'test'});
      plugin.beforeHook({ui: ui, config: {
        test: { repository: 'test-repo', distDir: testPath }
      }});
      plugin.configure();
      expect(plugin.name).to.be.eq("test");
      expect(plugin.defaultConfig.branch).to.be.eq('gh-pages');
      expect(plugin.requiredConfig).to.be.eql(['repository']);
    });

    it("upload", function(done){
      pipeline.run().then(function(){
        return NodeGit.Repository.open(testPath);
      }).then(function(repo){
        return repo.getHeadCommit();
      }).then(function(commit){
        expect(commit.message()).to.include('Updated at');
        return commit.getEntry('test-file');
      }).then(function(entry) {
        expect(entry.isFile()).to.be.ok;
      }).then(function(){
        return NodeGit.Repository.open(testPath);
      }).then(function(repo) {
        return NodeGit.Remote.lookup(repo, 'origin');
      }).then(function(remote){
        expect(remote.url()).to.eq('git://repo/my-test-repo.git');
      }).then(function(){
        var remote = global.gitMock;
        var branch = remote.called[0][0];
        var options = remote.called[1];
        var signature = remote.called[2];
        var message = remote.called[3];
        expect(branch).to.eq('+refs/heads/master:refs/heads/gh-pages');
        expect(options).to.eq(null);
        expect(signature).to.eql(remote.repo.defaultSignature());
        expect(message).to.eq('Push to gh-pages');
        done();
      }).catch(function (err) {
        done(err || new Error('failed: catch without err'));
      });
    });

    it("upload when a dist folder with git and repository configured", function(done){
      var git = require('nodegit');
      git.Repository.init(testPath, 0)
      .then(function(repo){
        return git.Remote.create(repo, 'origin', 'git@github.com:dukex/tests.git');
      })
      .then(function(){
        return pipeline.run();
      })
      .then(function(){
        var remote = global.gitMock;
        var branch = remote.called[0][0];
        var options = remote.called[1];
        var signature = remote.called[2];
        var message = remote.called[3];
        expect(branch).to.eq('+refs/heads/master:refs/heads/gh-pages');
        expect(options).to.eq(null);
        expect(message).to.eq('Push to gh-pages');
        done();
      }).catch(function (err) {
        done(err || new Error('failed: catch without err'));
      });
    });
  });
});
