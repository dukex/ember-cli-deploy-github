# ember-cli-deploy-github [![Build Status](https://travis-ci.org/dukex/ember-cli-deploy-github.svg)](https://travis-ci.org/dukex/ember-cli-deploy-github)

> An ember-cli-deploy plugin to upload app to [Github Pages](https://pages.github.com/)

<hr/>
**WARNING: This plugin is only compatible with ember-cli-deploy versions >= 0.5.0**
<hr/>

This plugin deploy your app to a specified repository. It's to be used to deploy your application in github pages. To see this plguin in action take a look in  [ember-cli-deploy-github-example](https://github.com/dukex/ember-cli-deploy-github-example) repository.

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation](http://ember-cli.github.io/ember-cli-deploy/plugins).

## Quick Start

To get up and running quickly, do the following:

* Ensure [ember-cli-deploy-build](https://github.com/zapnito/ember-cli-deploy-build) is installed and configured.

* Install this plugin

```
$ ember install ember-cli-deploy-github
```

* Place the following configuration into config/deploy.js

```
ENV.github = {
  repository: '<your-repository>'
};
```

* Run pipeline

```
$ ember deploy
```

## Installation

```
$ ember install ember-cli-deploy-github
```

## ember-cli-deploy Hooks Implemented

For detailed information on what plugin hooks are and how they work, please refer to the [Plugin Documentation](http://ember-cli.github.io/ember-cli-deploy/plugins).

* ```configure```
* ```upload```

## Configuration Options

For detailed information on how configuration of plugins works, please refer to the [Plugin Documentation](http://ember-cli.github.io/ember-cli-deploy/plugins).

### branch

The target branch on remote repository where the plugin will push app. By default the plugin use ```gh-pages```, for more information about branch please refer to [Github Pages](https://pages.github.com/)

Default: ```gh-pages```

### repository

The repository the plugin will push your app.

Default: ```undefined```

### distDir

The root directory where the your app was builded. By default, this option will use the distDir property of the deployment context, provided by [ember-cli-deploy-build](https://github.com/zapnito/ember-cli-deploy-build).

Default: ```context.distDir```

## Prerequisites

The following properties are expected to be present on the deployment context object:

* ```distDir``` (provided by [ember-cli-deploy-build](https://github.com/zapnito/ember-cli-deploy-build)).

## Plugin Warnings

The current version will always make deploy using push with force(```--force```),
that is, any previous manual changes on deploy branch will be lost.



## Running Tests

* `npm test`
