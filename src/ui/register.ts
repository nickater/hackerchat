import inquirer from 'inquirer';
import { registerUser } from '../services/auth/auth-service';
import { print } from '../utils/log';
import { emailQuestion, passwordQuestion } from '../utils/questions';

export const registerView = async () => {
  print('HackerChat Registration');
  const { email, password } = await inquirer.prompt([emailQuestion, passwordQuestion]);
  await registerUser({ email, password });
};
