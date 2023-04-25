import { ReceiptData, ScheduleData } from './../models/model.d';
import { Reducer, SetStateAction, Dispatch } from 'react';
import { UserProfile } from '../components/profile';
import { AuthUser } from '../../context/AuthContext';
import { ScheduleData } from '../models/model';

export type CategoryId = 'driving' | 'eating' | 'shopping' | 'etc' | 'booking';
export type ReceiptCategory = {
	id: CategoryId;
	name: string;
};
export type ScheduleProgress = 'pending' | 'done';

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

export interface GroupAccountSchedule extends ScheduleData {
	receipts?: ReceiptItem[];
	users: UserProfile[];
}

export interface ReceiptItem extends ReceiptData {
	category: ReceiptCategory;
	coordinator: UserProfile;
	exceptedUsers: UserProfile[];
	usersToPay: UserProfile[];
}

export type CategoryItems = {
	[category in CategoryId]?: ReceiptItem[];
};

export type ReceiptAddForm = Omit<ReceiptData, 'id', 'paymentToEqual'>;

export type GroupAccountProgress = 'in-progress' | 'done';

export type UserPayment = {
	toPay: number;
	paid: number;
	user: UserProfile;
	receipts: ReceiptItem[];
};

export type ColorMode = 'light' | 'dark';
export type IsStretched = boolean;
export type TextSize = 'text-xs' | 'text-sm' | 'text-lg';
