import { BaseCommand } from '../core/BaseCommand.js';

export class ClearCommand extends BaseCommand {
    getName(): string {
        return 'clear';
    }

    getDescription(): string {
        return 'Clear the terminal screen';
    }

    getArguments(): string {
        return '';
    }

    execute(): void {
        process.stdout.write('\x1Bc');
    }
}
