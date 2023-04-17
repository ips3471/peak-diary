import { Reducer, SetStateAction, Dispatch } from 'react';
import { UserProfile } from '../components/profile';
import { AuthUser } from '../../context/AuthContext';

type Category = 'driving' | 'eating' | 'shopping' | 'etc' | 'booking';

/* export type ScheduleFormInputs = {
	title: string;
	date: string;
	userLength: number;
}; */

export type ScheduleProgress = 'pending' | 'done';

export type GroupAccountState = GroupAccountSchedule | GroupAccountItem;

export type UpdateReducer<T> = Dispatch<GroupAccountAction<T>>;
export type UpdateState<T> = Dispatch<SetStateAction<T[]>>;

export type User = {
	uid: string;
	name: string;
	photoURL: string | null;
	account: string | null;
	isAdmin: boolean;
};

export type GroupAccountReducer<T> = Reducer<T[], GroupAccountAction<T>>;

export type GroupAccountAction<T> =
	| UpdateAction<T>
	| DeleteAction<T>
	| InitAction<T>
	| AddAction<T>;

type UpdateAction<T> = {
	type: 'update';
	payload: T;
};
type DeleteAction<T> = {
	type: 'delete';
	payload: string;
};
type InitAction<T> = {
	type: 'init';
	payload: T[];
};
type AddAction<T> = {
	type: 'add';
	payload: T;
};

export type GroupAccountSchedule = {
	id: string;
	code: number;
	date: string;
	host: string;
	userLength: number;
	users: UserProfile[];
	isDone: boolean;
	title: string;
};

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

export type GroupAccountProgress = 'in-progress' | 'done';

export type UserPayment = {
	uid: string;
	name: string;
	toPay: number;
	paid: number;
	receipts: ReceiptItem[];
};
