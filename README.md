# GitHub Comment CLI

by [Nicholas C. Zakas](https://humanwhocodes.com)

![Node CI](https://github.com/humanwhocodes/github-comment/workflows/Node%20CI/badge.svg)

If you find this useful, please consider supporting my work with a [donation](https://humanwhocodes.com/donate).

## Description

A simple CLI for posting comments to GitHub. This is intended for use in CI systems such as GitHub actions in order to enable to Twitter notifications of important events.

## Usage

You must have Node.js to use this package.

Next, define your environment variable:

* `GITHUB_TOKEN` - your GitHub access token

The CLI will not work without this environment variable.

Then, you can run the CLI and pass a message on the command line using `npx`:

```
$ npx @humanwhocodes/github-comment owner/repo#1234 "Hello from the command line!"
```

Where `owner/repo#1234` is the issue or pull request that you'd like to comment on.

### Testing with dotenv

If you'd like to test with [`dotenv`](https://npmjs.com/package/dotenv), define an additional environment variable `GHC_DOTENV=1` before executing the CLI. This will cause a local `.env` file to be read before executing.

### Using in a GitHub Workflow

Be sure to set up [GitHub secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) for each environment variable. Then, you can configure a job like this:

```yaml
jobs:
  tweet:
    name: Comment Something
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v1
        with:
          node-version: 12
      - run: 'npx @humanwhocodes/github-comment owner/repo#1234 "Your comment text"'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Developer Setup

1. Ensure you have [Node.js](https://nodejs.org) 12+ installed
2. Fork and clone this repository
3. Run `npm install`
4. Run `npm test` to run tests

## License and Copyright

This code is licensed under the Apache 2.0 License (see LICENSE for details).

Copyright Human Who Codes LLC. All rights reserved.
