/* jshint node: true */
'use strict';



module.exports = {
  name: 'ember-deploy-github',
  type: 'ember-deploy-addon',
  adapters: {
    assets: {
      'github': S3Adapter
    },
    index: {
      'github': S3Adapter
    }
  }
};
