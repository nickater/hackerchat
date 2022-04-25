import inquirer from 'inquirer';
import { emailQuestion, passwordQuestion } from '../utils/questions';
import { print } from '../utils/log';
import { authenticateUser } from '../services/auth/auth-service';
import { CoreProvider } from '../services/state/CoreProvider';
import { ViewResponse, ViewResponseType } from './types';
import { handleError } from '../utils/error-handler';
import { saveEmail, saveId } from '../utils/hackerchatrc';

export const loginView = async (): Promise<ViewResponse> => {
  try {
    print('HackerChat Login');
    const { email, password } = await inquirer.prompt([emailQuestion, passwordQuestion]);
    const authenticationResponse = await authenticateUser({ email, password });
    if (authenticationResponse.user) {
      await CoreProvider.instance.setUserId(authenticationResponse.user.uid);
      await CoreProvider.instance.setUserEmail(email);
      await saveId(authenticationResponse.user.uid);
      await saveEmail(email);
    }
    const response = new ViewResponse(ViewResponseType.SUCCESS);
    return response;
  } catch (error) {
    handleError(error);
    const response = new ViewResponse(ViewResponseType.FAIL);
    return response;
  }
};
