import { Dispatch, SetStateAction } from 'react';
import {
	Category,
	GroupAccountItem,
	ReceiptItem,
	UserPayment,
} from './../../types/components/group-account.d';
import database from '../../database/database';
import { ListID } from '../../types/interfaces/interfaces';

const GroupAccountPresenter = {
	addList(
		form: Pick<
			GroupAccountItem,
			'title' | 'date' | 'host' | 'userLength' | 'users'
		>,
		update: Dispatch<SetStateAction<GroupAccountItem[]>>,
	) {
		const element: Omit<GroupAccountItem, 'id' | 'code'> = {
			...form,
			isDone: false,
		};
		database.groupAccounts
			.addList(element)
			.then(data => update(prev => [...prev, data]));
	},

	async init(update: Dispatch<SetStateAction<GroupAccountItem[]>>) {
		database.groupAccounts.getLists().then(items => update(items));
	},

	updateList(
		updated: GroupAccountItem,
		update: Dispatch<SetStateAction<GroupAccountItem[]>>,
	) {
		database.groupAccounts.updateList(updated.id, updated);
		update(items =>
			items.map(item => (item.id === updated.id ? updated : item)),
		);
	},
	deleteList(
		target: GroupAccountItem,
		update: Dispatch<SetStateAction<GroupAccountItem[]>>,
	) {
		database.groupAccounts.deleteList(target.id);
		database.groupAccounts.receipts.deleteItems(target.id);
		update(items => items.filter(item => item.id !== target.id));
	},

	payments: {
		add(listId: string, uid: string) {
			const defaultForm: UserPayment = {
				paid: 0,
				toPay: 0,
			};
			database.groupAccounts.userPayments.init(listId, uid, defaultForm);
		},
	},

	users: {
		async findUserProfile(uid: string) {
			const found = await database.users.get(uid);
			return found;
		},
	},

	receipts: {
		async addItem(
			listId: ListID,
			form: Omit<ReceiptItem, 'id'>,
			update: Dispatch<SetStateAction<ReceiptItem[]>>,
		) {
			database.groupAccounts.receipts
				.addItem(listId, { ...form, total: Number(form.total) })
				.then(data =>
					update(prev => {
						return [...prev, data];
					}),
				);
		},
		async init(
			listId: string,
			category: Category,
			update: Dispatch<SetStateAction<ReceiptItem[]>>,
		) {
			database.groupAccounts.receipts
				.getListsByCategory(listId, category)
				.then(update);
		},
		deleteItem(
			listId: string,
			target: ReceiptItem,
			update: Dispatch<SetStateAction<ReceiptItem[]>>,
		) {
			database.groupAccounts.receipts.deleteItem(listId, target);
			update(items => items.filter(item => item.id !== target.id));
		},
		updateReceipt(
			listId: string,
			updated: ReceiptItem,
			update: Dispatch<SetStateAction<ReceiptItem[]>>,
		) {
			database.groupAccounts.receipts.updateItem(listId, updated);
			update(items =>
				items.map(item => (item.id === updated.id ? updated : item)),
			);
		},
	},
};

export default GroupAccountPresenter;
