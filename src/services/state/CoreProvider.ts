import { clearHackerChatrcFile, getId, saveId } from '../../utils/hackerchatrc';

export class CoreProvider {
  public static instance: CoreProvider = new CoreProvider();
  private _userId = '';
  private _isAppRunning = true;
  private _isLoggedIn = false;

  public setUserId = (userId: string) => {
    this._userId = userId;
    saveId(userId);
    this.setIsLoggedIn(true);
  };

  public clearUserId = () => {
    this._userId = '';
    this.setIsLoggedIn(false);
    clearHackerChatrcFile();
  };

  get userId() {
    return this._userId;
  }

  private setIsLoggedIn = (isLoggedIn: boolean) => {
    this._isLoggedIn = isLoggedIn;
  };

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  public quitApp = () => {
    this._isAppRunning = false;
  };

  get isAppRunning() {
    return this._isAppRunning;
  }
}
