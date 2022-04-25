import inquirer from 'inquirer';

export const waitWithDone = async () =>
  await inquirer.prompt([
    {
      name: 'Done',
      type: 'input',
    },
  ]);
