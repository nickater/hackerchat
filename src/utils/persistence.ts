import Conf from 'conf';
const persist = new Conf();

enum PersistItem {
	EMAIL = 'email',
	USER_ID = 'uid',
	REMEMBER_ME = 'rememberMe'
}

export const clearPersistedState = (clearAll?: boolean) => {
	if(clearAll) {
		persist.clear();
	} else {
		Object.values(PersistItem).forEach((item) => {
			if(item !== PersistItem.REMEMBER_ME) {
				persist.delete(item);
			}
		});
	}
};

export const getRememberMe = () => {
	const rememberMeState = persist.get(PersistItem.REMEMBER_ME) as boolean;
	return rememberMeState;
};

export const saveRememberMe = (shouldRemember: boolean) => {
	if (!shouldRemember) {
		clearPersistedState();
	}
	persist.set(PersistItem.REMEMBER_ME, shouldRemember);
};

export const getEmail = () => {
	const email = persist.get<string>(PersistItem.EMAIL);
	if (!email) throw new Error('No persisted email');
	return email as string;
};

export const saveEmail = (email: string) => {
	return persist.set(PersistItem.EMAIL, email);
};

export const getId = () => {
	const id = persist.get(PersistItem.USER_ID);
	if (!id) throw new Error('No persisted email');
	return id as string;
};

export const saveId = async (id: string) => {
	return persist.set(PersistItem.USER_ID, id);
};
