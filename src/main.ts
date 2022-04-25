#! /usr/bin/env node

import { mainMenu } from './ui/main-menu';
import { CoreProvider } from './services/state/CoreProvider';
import clear from 'clear';

const coreProvider = CoreProvider.instance;
const exit = () => process.exit();

const start = async () => {
	clear();
	while (coreProvider.isAppRunning) {
		await mainMenu();
	}
	exit();
};

start();
