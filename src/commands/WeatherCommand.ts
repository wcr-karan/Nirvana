import { BaseCommand } from '../core/BaseCommand.js';
import axios from 'axios';
import chalk from 'chalk';

export class WeatherCommand extends BaseCommand {
    getName(): string {
        return 'weather';
    }

    getDescription(): string {
        return 'Get current weather for a city';
    }

    getArguments(): string {
        return '<city>';
    }

    async execute(city: string): Promise<void> {
        try {
            console.log(chalk.yellow(`\nChecking weather for ${chalk.bold(city)}...`));
            const response = await axios.get(`https://wttr.in/${city}?format=j1`);
            const data = response.data.current_condition[0];
            const area = response.data.nearest_area[0];

            console.log(chalk.cyan(`\nWeather in ${chalk.bold(city)}, ${area.country[0].value}:`));
            console.log(chalk.gray('-----------------------------------------'));
            console.log(`${chalk.yellow('Temp:')} ${data.temp_C}°C / ${data.temp_F}°F`);
            console.log(`${chalk.yellow('Condition:')} ${data.weatherDesc[0].value}`);
            console.log(`${chalk.yellow('Humidity:')} ${data.humidity}%`);
            console.log(`${chalk.yellow('Wind:')} ${data.windspeedKmph} km/h`);
            console.log(chalk.gray('-----------------------------------------\n'));
        } catch (error: any) {
            console.error(chalk.red(`Error: Could not fetch weather for '${city}'`));
        }
    }
}
