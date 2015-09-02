# Ember-deploy-github

This is the github-adapter implementation to use [github pages](https://pages.github.com/) with
[ember-deploy](https://github.com/levelbossmike/ember-deploy), for index and asset management.

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
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
