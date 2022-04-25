import { color } from './colors';
import { print } from './log';

export const handleError = (error: unknown) => {
	if (error instanceof Error) {
		color.important(error.message);
	} else {
		print(error);
	}
};
