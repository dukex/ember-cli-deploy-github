/* jshint node: true */
'use strict';

var GithubAdapter = require('./lib/github');

module.exports = {
  name: 'ember-deploy-github',
  type: 'ember-deploy-addon',
  adapters: {
    assets: {
      'github': GithubAdapter
    },
    index: {
      'github': function() {
          return {
            upload: function() {

            }
          }
      }
    }
  }
};
