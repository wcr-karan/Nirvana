import { BaseCommand } from '../core/BaseCommand.js';
import axios from 'axios';
import chalk from 'chalk';

export class GitHubCommand extends BaseCommand {
    getName(): string {
        return 'github';
    }

    getDescription(): string {
        return 'Fetch information about a GitHub user';
    }

    getArguments(): string {
        return '<username>';
    }

    async execute(username: string): Promise<void> {
        try {
            console.log(chalk.blue(`\nFetching GitHub info for ${chalk.bold(username)}...`));
            const response = await axios.get(`https://api.github.com/users/${username}`);
            const data = response.data;

            console.log(chalk.cyan(`\nUser: ${chalk.bold(data.name || data.login)}`));
            console.log(chalk.gray('-----------------------------------------'));
            console.log(`${chalk.yellow('Bio:')} ${data.bio || 'No bio available'}`);
            console.log(`${chalk.yellow('Public Repos:')} ${data.public_repos}`);
            console.log(`${chalk.yellow('Followers:')} ${data.followers}`);
            console.log(`${chalk.yellow('Following:')} ${data.following}`);
            console.log(`${chalk.yellow('Location:')} ${data.location || 'Unknown'}`);
            console.log(chalk.gray('-----------------------------------------\n'));
        } catch (error: any) {
            console.error(chalk.red(`Error: Could not find GitHub user '${username}'`));
        }
    }
}
