import { app } from '../firebase';
import {
	collection,
	CollectionReference,
	doc,
	DocumentData,
	DocumentReference,
	getFirestore
} from 'firebase/firestore';

export const db = getFirestore(app);

export const createCollection = <T = DocumentData>(collectionName: string) => {
	return collection(db, collectionName) as CollectionReference<T>;
};

export const createDocument = <T = DocumentData>(documentPath: string) => {
	return doc(db, documentPath) as DocumentReference<T>;
};

