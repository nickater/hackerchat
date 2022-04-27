import { clear } from 'console';
import inquirer from 'inquirer';
import { CoreProvider } from '../../services/state/CoreProvider';
import { line, linePrinted } from '../../utils/general';
import { print } from '../../utils/log';
import { rememberMeView } from './rememberMe';

enum SettingsChoice {
	rememberMe = 'remember me',
	goBack = 'go back'
}

export const settingsView = async () => {
	let keepViewing = true;
	while (keepViewing) {
		const userEmail = CoreProvider.instance.userEmail;

		linePrinted();
		print(`Email: ${userEmail}`);
		linePrinted();
		
		const { settingsChoice } = await inquirer.prompt<{ settingsChoice: SettingsChoice }>({ name: 'settingsChoice', message: 'User Settings', type: 'list', choices: [line,...Object.values(SettingsChoice)] });

		switch (settingsChoice) {
			case SettingsChoice.rememberMe:
				await rememberMeView();
				break;
			case SettingsChoice.goBack:
				keepViewing = false;
				break;
			default:
				break;
		}
		clear();
	}
	keepViewing = true;
};
