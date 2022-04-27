import clear from 'clear';
import { textSync } from 'figlet';
import inquirer, { Separator } from 'inquirer';
import { CoreProvider } from '../services/state/CoreProvider';
import { print } from './log';
import { clearPersistedState } from './persistence';

export const waitWithDone = async () =>
	await inquirer.prompt([
		{
			name: 'done',
			message: 'Press enter when done...',
			type: 'input'
		}
	]);

export const waitWithMessage = async (message: string) =>
	await inquirer.prompt([
		{
			name: 'done',
			message,
			type: 'input'
		}
	]);
export const blankLine = print();
export const line = new Separator();
export const linePrinted = () => print(line.line);
export const blankSeparator = new Separator(' ');

export const waitFor = async (seconds: number) => {
		await new Promise((res) => setTimeout(() => {
		res('');
	}, seconds*1000));
};

export const displayLogo = () => {
	print(textSync('Hackr Chat', { horizontalLayout: 'controlled smushing' }));
};

export const exit = () => {
	const coreProvider = CoreProvider.instance;
	coreProvider.quitApp();
	clear();
};

export const logout = async () => {
	CoreProvider.instance.clearUserId();
	const clearAll = true;
	clearPersistedState(clearAll);
};

export const longestStringLength = (strings: string[]) => {
	let winner = 0;
	strings.forEach((str) => {
		if(str.length > winner) {
			winner = str.length;
		}
	});
	return winner;
};