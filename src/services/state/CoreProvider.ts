import { clearHackerChatrcFile } from '../../utils/persistance';

export class CoreProvider {
	public static instance: CoreProvider = new CoreProvider();
	private _userId = '';
	private _userEmail = '';
	private _isAppRunning = true;
	private _isLoggedIn = false;

	public setUserId = async (userId: string) => {
		this._userId = userId;
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

	public setUserEmail = async (email: string) => {
		this._userEmail = email;
	};

	get userEmail() {
		return this._userEmail;
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
