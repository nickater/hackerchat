import inquirer, { ConfirmQuestion } from 'inquirer';
import { CoreProvider } from '../../services/state/CoreProvider';
import { clearPersistedState, saveEmail, saveId, saveRememberMe } from '../../utils/persistence';

const rememberMeQuestion = (currentState: boolean): ConfirmQuestion => ({
      type: 'confirm',
      name: 'rememberMe',
      message: 'Stay logged in?',
      default: currentState,
    });

const rememberMeHandler = (choice: boolean) => {
  CoreProvider.instance.setRememberMe(choice);
  if(choice) {
    const userId = CoreProvider.instance.userId;
    const userEmail = CoreProvider.instance.userEmail;
    saveRememberMe(choice);
    saveEmail(userEmail);
    saveId(userId);
  } else {
    clearPersistedState();
  }
};

export const rememberMeView = async () => {

  const { rememberMe } = await inquirer.prompt(rememberMeQuestion(CoreProvider.instance.shouldRememberMe));

  rememberMeHandler(rememberMe);
  
};