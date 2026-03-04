export abstract class BaseCommand {
    abstract getName(): string;
    abstract getDescription(): string;
    abstract getArguments(): string;
    abstract execute(...args: any[]): Promise<void> | void;

    getOptions(): { flags: string, description: string, defaultValue?: any }[] {
        return [];
    }
}
