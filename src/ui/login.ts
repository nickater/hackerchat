import inquirer from 'inquirer';
import { emailQuestion, passwordQuestion } from '../utils/questions';
import { print } from '../utils/log';
import { authenticateUser } from '../services/auth/auth-service';

export const loginView = async () => {
  print('HackerChat Login');
  const { email, password } = await inquirer.prompt([emailQuestion, passwordQuestion]);
  print(email, password);
  const response = await authenticateUser({ email, password });
  print(response.user);
};
