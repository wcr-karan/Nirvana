import { BaseCommand } from '../core/BaseCommand.js';
import chalk from 'chalk';

export class RandomCommand extends BaseCommand {
    getName(): string {
        return 'random';
    }

    getDescription(): string {
        return 'Generate a random number between min and max';
    }

    getArguments(): string {
        return '[min] [max]';
    }

    execute(minStr: string = '1', maxStr: string = '100'): void {
        const min = parseInt(minStr);
        const max = parseInt(maxStr);

        if (isNaN(min) || isNaN(max)) {
            console.error(chalk.red('Error: Arguments must be numbers.'));
            return;
        }

        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(`${chalk.cyan('Random number between')} ${chalk.bold(min)} ${chalk.cyan('and')} ${chalk.bold(max)}: ${chalk.yellow.bold(randomNum)}`);
    }
}
