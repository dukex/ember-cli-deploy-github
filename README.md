# Ember-deploy-github [![Build Status](https://travis-ci.org/dukex/ember-deploy-github.svg)](https://travis-ci.org/dukex/ember-deploy-github)

This is the github-adapter implementation to use [github pages](https://pages.github.com/) with
[ember-deploy](https://github.com/levelbossmike/ember-deploy), for index and asset management.

## Donate to 1P8ccYhVt4ByLahuVXiCY6U185gmYA8Rqf

## `deploy.js`

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
