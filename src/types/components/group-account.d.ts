import { AuthUser } from '../../context/AuthContext';

type Category = 'driving' | 'eating' | 'buying' | 'etc' | 'booking';

export type ReceiptItem = {
	id: string;
	category: Category;
	total: number;
	url: string;
	description: string;
	coordinatorUid: string;
};

export type GroupAccountItem = {
	id: string;
	code: number;
	date: string;
	host: string;
	userLength: number;
	users: string[];
	isDone: boolean;
	title: string;
	receipts: ReceiptItem[];
};

export type GroupAccountState = 'in-progress' | 'done';
