import inquirer from 'inquirer';
import { CoreProvider } from '../services/state/CoreProvider';
import { waitWithDone } from '../utils/general';
import { print } from '../utils/log';

export const settingsView = async () => {
  const userEmail = CoreProvider.instance.userEmail;
  const userId = CoreProvider.instance.userId;

  print(`Email: ${userEmail}`);
  print(`User ID: ${userId}`);
  await waitWithDone();
};
