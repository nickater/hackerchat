import fs from 'fs/promises';
import os from 'os';
import { convertFileToObject } from './file-helper';

const tokenFile = `${os.homedir()}/.hackerchatrc`;

export const clearHackerChatrcFile = async () => {
  try {
    return await fs.rm(tokenFile);
  } catch {
    // do nothing
  }
};

export const getEmail = async () => {
  let file: string;
  let email: string;
  file = await fs.readFile(tokenFile, { encoding: 'utf-8' });
  const lines = file.split(/\r?\n/).filter((line) => line !== '');
  const entity = convertFileToObject(lines);
  email = entity.EMAIL;
  if (email === '') throw new Error('No ID found');

  return email;
};

export const getId = async () => {
  let file: string;
  let id: string;
  file = await fs.readFile(tokenFile, { encoding: 'utf-8' });
  const lines = file.split(/\r?\n/).filter((line) => line !== '');
  const entity = convertFileToObject(lines);
  id = entity.ID;
  if (id === '') throw new Error('No ID found');
  return id;
};

export const saveEmail = async (email: string) => {
  try {
    await fs.appendFile(tokenFile, `EMAIL=${email}\n`);
  } catch (error) {
    throw new Error('Save email unsuccessful.');
  }
};

export const saveId = async (id: string) => {
  try {
    await fs.appendFile(tokenFile, `ID=${id}\n`);
  } catch (error) {
    throw new Error('Save ID unsuccessful.');
  }
};
