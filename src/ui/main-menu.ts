import inquirer, { ListQuestion } from 'inquirer';
import { CoreProvider } from '../services/state/CoreProvider';
import { displayLogo, exit, line, logout, waitFor } from '../utils/general';
import { getEmail, getId, getRememberMe } from '../utils/persistence';
import { chatMenuView } from './chat/chat-menu';
import { loginView } from './login';
import { registerView } from './register';
import { settingsView } from './settings/settings';


const choiceManager = () => {
	const { isLoggedIn } = CoreProvider.instance;
	const choices: string[] = [];
	if (isLoggedIn) choices.push('chat');
	if (!isLoggedIn) choices.push('login');
	if (!isLoggedIn) choices.push('register');
	choices.push('settings');
	if (isLoggedIn) choices.push('logout');
	choices.push('exit');
	return choices;
};

const mainMenuList = (): ListQuestion => ({
	name: 'destination',
	type: 'list',
	message: 'Main Menu',
	choices: [line, ...choiceManager()]
});

const attemptAutoLogin = async () => {
	try {
		const rememberMe = getRememberMe();
		if (rememberMe) {
			const userId = getId();
			const email = getEmail();
			CoreProvider.instance.setUserId(userId);
			CoreProvider.instance.setUserEmail(email);
		}
	} catch { }
};

export const mainMenu = async () => {
	if (!CoreProvider.instance.isLoggedIn) {
		await attemptAutoLogin();
	}
	displayLogo();
	await waitFor(0.2);

	const { destination } = await inquirer.prompt<{ destination: string }>([
		mainMenuList()
	]);
	switch (destination) {
		case 'chat':
			await chatMenuView();
			break;
		case 'login': {
			await loginView();
			break;
		}
		case 'register':
			await registerView();
			break;
		case 'settings':
			await settingsView();
			break;
		case 'logout':
			await logout();
			break;
		case 'exit':
			exit();
			break;
		default:
			break;
	}
};
