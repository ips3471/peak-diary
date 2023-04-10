import { Database } from 'firebase/database';

export type FirebaseRoots = 'admins' | 'checklists' | 'groupAccounts' | 'users';

export type UserDB = { db: Database; userRef: string };
