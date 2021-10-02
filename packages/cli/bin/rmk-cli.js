#!/usr/bin/env node

const { Command } = require('commander');

const build = require('../lib/commands/build');

const cliVersion = require('../package.json').version;

const program = new Command();

program.version(`@react-mobile-kit/cli ${cliVersion}`);

program
  .command('build')
  .description('Compile components in production mode')
  .option('--watch', 'Watch file change')
  .action(build);

program.parse(process.argv);
