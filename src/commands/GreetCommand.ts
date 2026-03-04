import { BaseCommand } from '../core/BaseCommand.js';
import chalk from 'chalk';

export class GreetCommand extends BaseCommand {
    getName(): string {
        return 'greet';
    }

    getDescription(): string {
        return 'Greet a person with a custom message';
    }

    getArguments(): string {
        return '<name>';
    }

    execute(name: string): void {
        console.log(chalk.green(`Hello, ${chalk.bold(name)}! Welcome to Nirvana CLI. ✨`));
    }
}
