import { Dispatch, SetStateAction } from 'react';
import {
	Category,
	GroupAccountItem,
	ReceiptItem,
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

	receipts: {
		async addItem(
			listId: ListID,
			form: Omit<ReceiptItem, 'id'>,
			update: Dispatch<SetStateAction<ReceiptItem[]>>,
		) {
			database.groupAccounts.receipts.addItem(listId, form).then(data =>
				update(prev => {
					console.log(prev);
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
	},
};

export default GroupAccountPresenter;
