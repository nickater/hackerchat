import inquirer, { Separator } from 'inquirer';
import { print } from './log';

export const waitWithDone = async () =>
	await inquirer.prompt([
		{
			name: 'done',
			message: 'Press enter when done...',
			type: 'input'
		}
	]);

export const line = () => new Separator();
export const linePrinted = () => print(line().line);