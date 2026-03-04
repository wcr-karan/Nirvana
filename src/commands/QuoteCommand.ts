import { BaseCommand } from '../core/BaseCommand.js';
import axios from 'axios';
import chalk from 'chalk';

export class QuoteCommand extends BaseCommand {
    getName(): string {
        return 'quote';
    }

    getDescription(): string {
        return 'Get a random inspirational quote';
    }

    getArguments(): string {
        return '';
    }

    async execute(): Promise<void> {
        try {
            console.log(chalk.magenta(`\nFetching an inspirational quote for you...`));
            const response = await axios.get('https://api.quotable.io/random');
            const data = response.data;

            console.log(chalk.italic(`"${data.content}"`));
            console.log(chalk.bold(`- ${data.author}\n`));
        } catch (error: any) {
            // Fallback since quotable API can be flaky
            console.log(chalk.italic(`"The only way to do great work is to love what you do."`));
            console.log(chalk.bold(`- Steve Jobs (Fallback)\n`));
        }
    }
}
