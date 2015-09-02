/* jshint node: true */
'use strict';

var GithubAdapter = require('./lib/github');

var nothing = function() {
  return {
    upload: function() {}
  }
}

module.exports = {
  name: 'ember-deploy-github',
  type: 'ember-deploy-addon',
  adapters: {
    assets: {
      'github': GithubAdapter
    },
    index: {
      'github': nothing
    }
  }
};
