import { print } from '../../utils/log';

export class CoreProvider {
  public static instance: CoreProvider = new CoreProvider();

  private _isAppRunning = true;

  public quitApp = () => {
    print('quitting app');
    this._isAppRunning = false;
  };

  get isAppRunning() {
    return this._isAppRunning;
  }
}
