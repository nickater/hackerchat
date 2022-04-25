import Conf from 'conf';
const persist = new Conf();

export const clearHackerChatrcFile = async () => {
	persist.clear();
};

export const getEmail = () => {
	const email = persist.get<string>('email');
	if (!email) throw new Error('No persisted email');
	return email as string;
};

export const getId = () => {
	const id = persist.get('uid');
	if (!id) throw new Error('No persisted email');
	return id as string;
};

export const saveEmail = (email: string) => {
	return persist.set('email', email);
};

export const saveId = async (id: string) => {
	return persist.set('uid', id);
};
