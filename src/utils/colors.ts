import chalk from 'chalk';
import { print } from './log';

export const color = {
  important: (str: string) => print(chalk.red(str)),
  casual: (str: string) => print(chalk.blue(str)),
};