import { BaseCommand } from '../core/BaseCommand.js';
import os from 'os';
import chalk from 'chalk';

export class SysInfoCommand extends BaseCommand {
    getName(): string {
        return 'sysinfo';
    }

    getDescription(): string {
        return 'Show current system information';
    }

    getArguments(): string {
        return '';
    }

    execute(): void {
        console.log(chalk.blue(`\nSystem Information:`));
        console.log(chalk.gray('-----------------------------------------'));
        console.log(`${chalk.yellow('Platform:')} ${os.platform()} ${os.release()}`);
        console.log(`${chalk.yellow('Architecture:')} ${os.arch()}`);
        console.log(`${chalk.yellow('CPU:')} ${os.cpus()[0].model}`);
        console.log(`${chalk.yellow('Free Memory:')} ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
        console.log(`${chalk.yellow('Total Memory:')} ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
        console.log(`${chalk.yellow('Uptime:')} ${(os.uptime() / 3600).toFixed(2)} hours`);
        console.log(chalk.gray('-----------------------------------------\n'));
    }
}
