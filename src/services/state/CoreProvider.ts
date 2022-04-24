import { print } from '../../utils/log';

export class CoreProvider {
  public static instance: CoreProvider = new CoreProvider();
  private _userId = '';
  private _isAppRunning = true;
  private _isLoggedIn = false;

  public setUserId = (userId: string) => {
    this._userId = userId;
  };

  get userId() {
    return this._userId;
  }

  public setIsLoggedIn = (isLoggedIn: boolean) => {
    this._isLoggedIn = isLoggedIn;
  };

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  public quitApp = () => {
    print('quitting app');
    this._isAppRunning = false;
  };

  get isAppRunning() {
    return this._isAppRunning;
  }
}
