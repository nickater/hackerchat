import { Question } from 'inquirer';

export const areYouSureQuestion: Question = {
  type: 'confirm',
  message: 'Are you sure?',
  name: 'isConfirmed',
};

export const howMuchMoneyToAddQuestion: Question = {
  type: 'number',
  message: `How much money would you like to add?`,
  name: 'amount',
  default: 0.0,
};

export const howMuchMoneyToSubQuestion: Question = {
  type: 'number',
  message: `How much money would you like to subtract?`,
  name: 'amount',
  default: 0.0,
};

export const newBalanceConfirmationQuestion = (newBalance: string): Question => ({
  type: 'confirm',
  message: `Your new balance will be ${newBalance}. Are you sure?`,
  name: 'isConfirmed',
});

export const accountQuestion: Question = {
  type: 'input',
  message: 'What is the account name?',
  name: 'accountName',
};

export const emailQuestion: Question = {
  type: 'input',
  message: 'Enter your email: ',
  name: 'email',
};
export const passwordQuestion: Question = {
  type: 'password',
  message: 'Enter your password: ',
  name: 'password',
};

export const goBackChoice = 'go back';
