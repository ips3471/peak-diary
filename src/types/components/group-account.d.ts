import { UserProfile } from './profile.d';
import { AuthUser } from '../../context/AuthContext';

type Category = 'driving' | 'eating' | 'shopping' | 'etc' | 'booking';

export type ReceiptItem = {
	id?: string;
	category: Category;
	total: number;
	paymentToEqual: number;
	receiptURL: string;
	description: string;
	coordinatorUid: string;
	exceptedUsers: UserProfile[];
	usersToPay: UserProfile[];
};

export type GroupAccountItem = {
	id: string;
	code: number;
	date: string;
	host: string;
	userLength: number;
	users: UserProfile[];
	isDone: boolean;
	title: string;
};

export type ReceiptCategory = {
	id: Category;
	name: string;
};

export type GroupAccountState = 'in-progress' | 'done';

export type UserPayment = {
	uid: string;
	name: string;
	toPay: number;
	paid: number;
	receipts: ReceiptItem[];
};
