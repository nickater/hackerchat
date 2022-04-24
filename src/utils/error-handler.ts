import { print } from './log';

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    print(error.message);
  } else {
    print(error);
  }
};
