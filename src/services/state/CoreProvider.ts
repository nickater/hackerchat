export class CoreProvider {
	public static instance: CoreProvider = new CoreProvider();
	private _userId = '';
	private _userEmail = '';
	private _isAppRunning = true;
	private _isLoggedIn = false;
	private _rememberMe = true;

	public setRememberMe = (choice: boolean) => {
		this._rememberMe = choice;
	};

	get shouldRememberMe() {
		return this._rememberMe;
	}

	public setUserId = (userId: string) => {
		this._userId = userId;
		this.setIsLoggedIn(true);
	};

	public clearUserId = () => {
		this._userId = '';
		this.setIsLoggedIn(false);

	};

	get userId() {
		return this._userId;
	}

	public setUserEmail = (email: string) => {
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
