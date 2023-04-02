import { Dispatch, SetStateAction } from 'react';
import {
	Category,
	GroupAccountItem,
	ReceiptItem,
} from './../../types/components/group-account.d';
import database from '../../database/database';
import { ListID } from '../../types/interfaces/interfaces';
import { v4 as uuid } from 'uuid';

type SetReceipts = Dispatch<
	React.SetStateAction<Map<Category, ReceiptItem[]> | undefined>
>;

const { lists, receipts } = database.groupAccounts;

const GroupAccountPresenter = {
	lists: {
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
			database.groupAccounts.lists.addList(element).then(data => {
				update(prev => [...prev, data]);
			});
		},

		async init(update: Dispatch<SetStateAction<GroupAccountItem[]>>) {
			database.groupAccounts.lists.getLists().then(items => update(items));
		},

		updateList(
			updated: GroupAccountItem,
			update: Dispatch<SetStateAction<GroupAccountItem[]>>,
		) {
			database.groupAccounts.lists.updateList(updated.id, updated);
			update(items =>
				items.map(item => (item.id === updated.id ? updated : item)),
			);
		},
		deleteList(
			target: GroupAccountItem,
			update: Dispatch<SetStateAction<GroupAccountItem[]>>,
		) {
			database.groupAccounts.lists.deleteList(target.id);
			database.groupAccounts.receipts.deleteAll(target.id);
			database.groupAccounts.userPayments.deleteAll(target.id);
			update(items => items.filter(item => item.id !== target.id));
		},
	},

	users: {
		async findUserProfile(uid: string) {
			const found = await database.users.get(uid);
			return found;
		},
	},

	receipts: {
		update(listId: ListID, form: ReceiptItem, update: SetReceipts) {
			const { usersToPay } = form;
			const total = Number(form.total);

			const receipt = {
				...form,
				total,
				paymentToEqual: total / usersToPay.length,
			};

			const hasId = receipt.id ? receipt : { ...receipt, id: uuid() as string };

			receipts.updateItem(listId, hasId);

			update(prevMap => {
				if (!prevMap) {
					throw new Error('not found categoriesMap');
				}
				const receipts = prevMap.get(receipt.category) || [];
				return prevMap.set(
					receipt.category,
					form.id
						? receipts.map(r => (hasId.id === r.id ? hasId : r))
						: [...receipts, hasId],
				);
			});
		},

		async init(listId: ListID, update: SetReceipts) {
			receipts.getAll(listId).then(categories => {
				if (categories) {
					const map = new Map();
					Object.keys(categories).forEach(category => {
						map.set(category, Object.values(categories[category]));
					});
					update(map);
				}
			});
		},

		remove(listId: string, receipt: ReceiptItem, update: SetReceipts) {
			receipts.deleteItem(listId, receipt);
			update(prevMap => {
				if (!prevMap) {
					throw new Error('not found categoriesMap');
				}
				const receipts = prevMap.get(receipt.category);
				if (!receipts) {
					throw new Error('receipts array not found');
				}

				return prevMap.set(
					receipt.category,
					receipts.filter(r => r.id !== receipt.id),
				);
			});
		},
	},
};

export default GroupAccountPresenter;
