#!/usr/bin/env node
import { Command } from 'commander';
import { CommandRegistry } from './core/CommandRegistry.js';
import { GreetCommand } from './commands/GreetCommand.js';
import { FileInfoCommand } from './commands/FileInfoCommand.js';
import { GitHubCommand } from './commands/GitHubCommand.js';
import { WeatherCommand } from './commands/WeatherCommand.js';
import { QuoteCommand } from './commands/QuoteCommand.js';
import { SysInfoCommand } from './commands/SysInfoCommand.js';
import { ClearCommand } from './commands/ClearCommand.js';
import { HashCommand } from './commands/HashCommand.js';
import { RandomCommand } from './commands/RandomCommand.js';
import { ListFilesCommand } from './commands/ListFilesCommand.js';
import chalk from 'chalk';

const program = new Command();

program
    .name('mycli')
    .description(chalk.cyan('Nirvana CLI - A powerful, OOP-based multi-tool'))
    .version('1.0.0');

const registry = new CommandRegistry(program);

registry.register(new GreetCommand());
registry.register(new FileInfoCommand());
registry.register(new GitHubCommand());
registry.register(new WeatherCommand());
registry.register(new QuoteCommand());
registry.register(new SysInfoCommand());
registry.register(new ClearCommand());
registry.register(new HashCommand());
registry.register(new RandomCommand());
registry.register(new ListFilesCommand());

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
