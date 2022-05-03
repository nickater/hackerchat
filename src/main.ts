#! /usr/bin/env node

import { mainMenu } from './ui/main-menu';
import { CoreProvider } from './services/state/CoreProvider';
import { initialStateHandler } from './utils/initialize';

const coreProvider = CoreProvider.instance;
const exit = () => process.exit();

const startCli = async () => {
	await initialStateHandler();
	while (coreProvider.isAppRunning) {
		await mainMenu();
	}
	exit();
};

startCli();
