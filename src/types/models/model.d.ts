import { Database } from 'firebase/database';
import { ReceiptItem } from '../group-account/group-account';

export type FirebaseRoots = 'admins' | 'checklists' | 'groupAccounts' | 'users';

export type UserDB = { db: Database; userRef: string };

export interface ReceiptData {
	id: string;
	category: Category;
	total: number;
	paymentToEqual: number;
	receiptURL?: string;
	description: string;
	coordinator: string;
	usersToPay: string[];
}

export interface ScheduleData {
	id: string;
	code: number;
	date: string;
	host: string;
	receipts?: ReceiptData[];
	userLength: number;
	users: string[];
	isDone: boolean;
	title: string;
}
