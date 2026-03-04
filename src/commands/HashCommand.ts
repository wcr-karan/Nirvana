import { BaseCommand } from '../core/BaseCommand.js';
import crypto from 'crypto';
import chalk from 'chalk';

export class HashCommand extends BaseCommand {
    getName(): string {
        return 'hash';
    }

    getDescription(): string {
        return 'Generate SHA256 hash of a string';
    }

    getArguments(): string {
        return '<text>';
    }

    execute(text: string): void {
        const hash = crypto.createHash('sha256').update(text).digest('hex');
        console.log(`${chalk.yellow('Input:')} ${text}`);
        console.log(`${chalk.green('SHA256:')} ${hash}`);
    }
}
