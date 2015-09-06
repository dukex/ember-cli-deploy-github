# ember-cli-deploy-github [![Build Status](https://travis-ci.org/dukex/ember-cli-deploy-github.svg)](https://travis-ci.org/dukex/ember-cli-deploy-github)

This is the github-adapter implementation to deploy your ember app to [Github Pages](https://pages.github.com/) with
[ember-cli-deploy](https://github.com/ember-cli/ember-cli-deploy).

<hr/>
**WARNING: This plugin is only compatible with ember-cli-deploy versions >= 0.5.0**
<hr/>

## Use

* Install ```ember-cli-deploy-build``` plugin

```
$ ember install ember-cli-deploy-build
```

* Install this plugin

```
$ ember install ember-cli-deploy-github
```

* Configure deploy.js file like the follow example:

```
module.exports = function(target) {
  var ENV = {
    github: {
      repository: 'put-your-repo-url-here.git',
      branch: 'gh-pages' // opcional, gh-pages is defualt
    }
  };

  return ENV;
}
```

* Run pipeline

```
$ ember deploy
```

## Warnings

The current version will always make deploy using push with force(```--force```),
that is, any previous manual changes on deploy branch will be lost.

## Installation

* `git clone` this repository
* `npm install`

## Running Tests

* `npm test`
