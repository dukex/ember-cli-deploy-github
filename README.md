# ember-cli-deploy-github [![Build Status](https://travis-ci.org/dukex/ember-cli-deploy-github.svg)](https://travis-ci.org/dukex/ember-cli-deploy-github)

This is the github-adapter implementation to deploy your ember app to [Github Pages](https://pages.github.com/) with
[ember-cli-deploy](https://github.com/ember-cli/ember-cli-deploy).

TODO: link to example app

## Configure

TODO: add steps to configure using 0.5 API

TODO: fix i
```
module.exports = {
  development: {
    store: {
      type: "github",
    },

    assets: {
      type: "github",
      branch: "master", // default is gh-pages
      repository: "git@github.com:user/repo.git",
    }
  }
}
```

## note about push

The current version will always make with push with force(```--force```)


## Installation

* `git clone` this repository
* `npm install`

## Running Tests

* `npm test`
