# GraphQL Resolver Middleware

⨠ GraphQL resolver middleware composer

[![Build Status](https://travis-ci.org/kkemple/graphql-resolver-middleware.svg?branch=master)](https://travis-ci.org/kkemple/graphql-resolver-middleware)
[![codecov](https://codecov.io/gh/kkemple/graphql-resolver-middleware/branch/master/graph/badge.svg)](https://codecov.io/gh/kkemple/graphql-resolver-middleware)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](#badge)
[![NPM version](https://img.shields.io/npm/v/graphql-resolver-middleware.svg)](https://www.npmjs.com/package/graphql-resolver-middleware)

## What does it do?
Adding all the functionality needed for individual resolvers can end up in a lot of boilerplate code and messy resolver functions. `graphql-resolver-middleware` solves this problem by allowing you to compose middleware for each resolver, allowing you to create complex workflows around your data in a clean manner.

Some common problems you can solve with resolver middleware are authentication, authorization, logging, timing, analytics gathering, extending context, etc.

> **Check out the launchpad examples below!**

## How does it do it?
`graphql-resolver-middleware` exports a single function that takes *N* number of middleware and applies them serially to the resolver parameters, allowing you to either error out if certain conditions are not met or extend functionality by extending/mutating the context property.

## compose()

```javascript
import auth from 'graphql-auth';
import log from 'graphql-log';
import statsd from 'graphql-statsd';

const middleware = compose(statsd, log);

const resolvers = {
  Query: {
    hello: middleware(
      // accepts any function that meets resolver API
      auth(['view:hello'], (parent, args, context) => { ... })
    )
  }
}
```



