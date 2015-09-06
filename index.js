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
        branch: 'gh-pages'
      },
      requiredConfig: ['repository'],
      upload: function (context) {
        this.git = this.readConfig('git') || require('nodegit');
        var uploader = new Uploader(this.git, context);
        return uploader.upload();
      }
    });
    return new DeployPlugin();
  }
};
