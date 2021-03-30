#!/usr/bin/env node

const yargs = require('yargs');
const kernel = require('../../kernel/index.js');
const cli = kernel.bootCli(yargs);
cli.start();