import { Dispatch, SetStateAction } from 'react';
import { GroupAccountItem } from './../../types/components/group-account.d';
import database from '../../database/database';

const GroupAccountPresenter = {
	add(
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
			.add(element)
			.then(data => update(prev => [...prev, data]));
	},

	async init(update: Dispatch<SetStateAction<GroupAccountItem[]>>) {
		database.groupAccounts.get().then(items => update(items));
	},

	update(
		updated: GroupAccountItem,
		update: Dispatch<SetStateAction<GroupAccountItem[]>>,
	) {
		database.groupAccounts.update(updated.id, updated);
		update(items =>
			items.map(item => (item.id === updated.id ? updated : item)),
		);
	},
};

export default GroupAccountPresenter;
