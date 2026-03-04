import { BaseCommand } from '../core/BaseCommand.js';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export class FileInfoCommand extends BaseCommand {
    getName(): string {
        return 'fileinfo';
    }

    getDescription(): string {
        return 'Get detailed information about a file';
    }

    getArguments(): string {
        return '<filename>';
    }

    async execute(filename: string): Promise<void> {
        try {
            const stats = await fs.stat(filename);
            console.log(chalk.cyan(`\nFileInfo for: ${chalk.bold(path.basename(filename))}`));
            console.log(chalk.gray('-----------------------------------------'));
            console.log(`${chalk.yellow('Size:')} ${stats.size} bytes`);
            console.log(`${chalk.yellow('Created:')} ${stats.birthtime}`);
            console.log(`${chalk.yellow('Modified:')} ${stats.mtime}`);
            console.log(`${chalk.yellow('Is Directory:')} ${stats.isDirectory()}`);
            console.log(chalk.gray('-----------------------------------------\n'));
        } catch (error: any) {
            console.error(chalk.red(`Error: Could not find file '${filename}'`));
        }
    }
}
