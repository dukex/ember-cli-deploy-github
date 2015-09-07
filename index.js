/* jshint node: true */
'use strict';

var Uploader = require('./lib/uploader');
var DeployPluginBase = require('ember-cli-deploy-plugin');

module.exports = {
  name: 'ember-cli-deploy-github',
  createDeployPlugin: function(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,
      defaultConfig: {
        branch: 'gh-pages',
        gitClient: function(context) {
          return require('nodegit');
        },
        distDir: function(context) {
          return context.distDir;
        }
      },
      requiredConfig: ['repository'],
      configure: function(context) {
        DeployPluginBase.prototype.configure.apply(this, arguments);

        var options = {
          branch:     this.readConfig('branch'),
          repository: this.readConfig('repository')
        };

        var logger = this.log.bind(this);

        var git = this.readConfig('gitClient');
        this.uploader = new Uploader(git, options, logger);
        this.log('configuring deploy to ' + options.repository + ' branch ' + options.branch)
      },
      upload: function (context) {
        return this.uploader.upload(this.readConfig('distDir'));
      }
    });
    return new DeployPlugin();
  }
};
