import { Dispatch, SetStateAction } from 'react';
import {
	GroupAccountItem,
	ReceiptItem,
} from './../../types/components/group-account.d';
import database from '../../database/database';

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
			receipts: [],
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
		addItem(
			listId: string,
			form: Omit<ReceiptItem, 'id'>,
			update: Dispatch<SetStateAction<ReceiptItem[]>>,
		) {
			database.groupAccounts.receipts
				.addItem(listId, form)
				.then(data => update(prev => [...prev, data]));
		},
	},
};

export default GroupAccountPresenter;
