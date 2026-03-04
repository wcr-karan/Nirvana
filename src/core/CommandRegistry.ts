import { Command } from 'commander';
import { BaseCommand } from './BaseCommand.js';
import chalk from 'chalk';

export class CommandRegistry {
    private program: Command;
    private commands: BaseCommand[] = [];

    constructor(program: Command) {
        this.program = program;
    }

    register(command: BaseCommand): void {
        const cmd = this.program
            .command(command.getName())
            .description(command.getDescription());

        const args = command.getArguments();
        if (args) {
            cmd.arguments(args);
        }

        command.getOptions().forEach(opt => {
            cmd.option(opt.flags, opt.description, opt.defaultValue);
        });

        cmd.action(async (...args: any[]) => {
            try {
                await command.execute(...args);
            } catch (error: any) {
                console.error(chalk.red(`Error executing command ${command.getName()}:`), error.message);
            }
        });

        this.commands.push(command);
    }
}
