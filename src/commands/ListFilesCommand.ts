import { BaseCommand } from '../core/BaseCommand.js';
import fs from 'fs-extra';
import chalk from 'chalk';

export class ListFilesCommand extends BaseCommand {
    getName(): string {
        return 'ls';
    }

    getDescription(): string {
        return 'List files in the current directory';
    }

    getArguments(): string {
        return '[path]';
    }

    async execute(targetPath: string = '.'): Promise<void> {
        try {
            const files = await fs.readdir(targetPath);
            console.log(chalk.blue(`\nFiles in ${chalk.bold(targetPath)}:`));
            console.log(chalk.gray('-----------------------------------------'));

            for (const file of files) {
                const stats = await fs.stat(file);
                if (stats.isDirectory()) {
                    console.log(`${chalk.blue.bold('📁 ' + file)}`);
                } else {
                    console.log(`${chalk.white('📄 ' + file)}`);
                }
            }
            console.log(chalk.gray('-----------------------------------------\n'));
        } catch (error: any) {
            console.error(chalk.red(`Error: Could not read directory '${targetPath}'`));
        }
    }
}
