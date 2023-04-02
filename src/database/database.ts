import {
	Category,
	GroupAccountItem,
	ReceiptItem,
	UserPayment,
} from './../types/components/group-account.d';
import { UserProfile } from './../types/components/profile.d';
import {
	CheckListItem,
	CheckListTab,
	CheckListTabItem,
} from './../types/interfaces/interfaces.d';
import { User } from 'firebase/auth';
import {
	getDatabase,
	get,
	child,
	ref,
	set,
	update,
	remove,
} from 'firebase/database';
import { firebaseApp } from '../service/firebase/firebase';
import { v4 as uuid } from 'uuid';

const db = getDatabase(firebaseApp);
const dbRef = ref(db);

type ItemsDirectory = 'lists' | 'receipts';

async function getLists<T>(
	directory: ItemsDirectory,
	path: string = '',
): Promise<T[]> {
	const snapshot = await get(ref(db, `groupAccounts/${directory}/${path}`));
	if (snapshot.exists()) {
		return Object.values(snapshot.val());
	} else {
		return [];
	}
}

const database = {
	async isAdmin(user: User | null) {
		return get(child(dbRef, 'admins')) //
			.then(snapshot => {
				if (snapshot.exists()) {
					return snapshot.val().includes(user?.uid);
				} else {
					return false;
				}
			});
	},

	checkList: {
		async getItemsInTab(tabId: string): Promise<CheckListItem[]> {
			const snapshot = await get(ref(db, `checklists/${tabId}/items`));
			if (snapshot.exists()) {
				return Object.values(snapshot.val());
			} else {
				return [];
			}
		},
		async getTabs(): Promise<CheckListTab[]> {
			const snapshot = await get(ref(db, `checklists`));
			if (snapshot.exists()) {
				const data = Object.values(snapshot.val()) as {
					id: string;
					items: Object;
					name: string;
				}[];
				const mapped = data.map(i => {
					if (i.items) {
						return { ...i, items: Object.values(i.items) };
					} else {
						return { ...i, items: [] };
					}
				});
				return data.map(i =>
					i.items
						? { ...i, items: Object.values(i.items) }
						: { ...i, items: [] },
				);
			} else {
				return [];
			}
		},

		async addList(list: Omit<CheckListItem, 'id'>) {
			const id = uuid();
			const element: CheckListItem = { ...list, id };
			set(ref(db, `/checklists/${list.category}/items/${id}`), element);
			console.log('add list in db', element);
			return element;
		},

		async addTab(name = ''): Promise<CheckListTab> {
			const id = uuid();
			const element = { name, id, items: [] };
			set(ref(db, `/checklists/${id}`), element);
			return element;
		},

		updateTab(tab: CheckListTabItem) {
			update(ref(db, `/checklists/${tab.id}`), tab);
			console.log('tab updated in db', tab);
		},

		updateItem(item: CheckListItem) {
			update(ref(db, `/checklists/${item.category}/items/${item.id}`), item);
			console.log('item updated', item);
		},

		deleteItem(item: CheckListItem) {
			remove(ref(db, `/checklists/${item.category}/items/${item.id}`));
			console.log('removed item', item.id, item.name);
		},

		deleteTab(tabId: string) {
			remove(ref(db, `/checklists/${tabId}`));
			console.log('removed tab', tabId);
		},
	},
	users: {
		update(uid: string, profile: UserProfile) {
			update(ref(db, `/users/${uid}`), profile);
			console.log('profile updated', profile);
		},
		async get(uid: string) {
			return get(ref(db, `users/${uid}`)).then(snapshot => {
				if (snapshot.exists()) {
					return snapshot.val() as UserProfile;
				}
			});
		},
	},
	groupAccounts: {
		lists: {
			async addList(form: Omit<GroupAccountItem, 'id' | 'code'>) {
				const id = uuid();
				const code = Math.floor(Math.random() * 9999);
				const element: GroupAccountItem = { ...form, id, code };
				set(ref(db, `/groupAccounts/lists/${id}`), element);
				set(ref(db, `/groupAccounts/payments/${id}/${element.host}`), {
					paid: 0,
					toPay: 0,
				});
				console.log('add group-account in db', element);
				return element;
			},
			getLists: async () => getLists<GroupAccountItem>('lists'),
			updateList(id: string, item: GroupAccountItem) {
				update(ref(db, `/groupAccounts/lists/${id}`), item);
				console.log('groupAccount updated', item);
			},
			deleteList(id: string) {
				remove(ref(db, `/groupAccounts/lists/${id}`));
			},
		},
		userPayments: {
			/* 			async findUserPayment(listId: string, uid: string) {
				const userPayment = await database.groupAccounts.userPayments.findByUid(
					listId,
					uid,
				);
				if (!userPayment) {
					throw new Error(`User not Found: ${uid}`);
				}
				return userPayment;
			},
			async getAll(listId: string) {
				return get(ref(db, `/groupAccounts/payments/${listId}`)).then(
					snapshot => {
						if (snapshot.exists()) {
							return snapshot.val() as UserPayments;
						}
					},
				);
			}, */
			/* 			init(listId: string, uid: string, form: UserPayment) {
				set(ref(db, `/groupAccounts/payments/${listId}/${uid}`), form);
				console.log('add new payments in db', form);
			}, */
			/* 			update(listId: string, uid: string, updated: UserPayment) {
				update(ref(db, `/groupAccounts/payments/${listId}/${uid}`), updated);
				console.log('payments updated', uid, updated);
				return updated;
			}, */
			/* async increment(
				listId: string,
				uid: string,
				type: 'toPay' | 'paid',
				value: number,
			) {
				const userPayment = await this.findUserPayment(listId, uid);
				const updated = { ...userPayment, [type]: userPayment[type] + value };
				await update(
					ref(db, `/groupAccounts/payments/${listId}/${uid}`),
					updated,
				);
				console.log(`increment-${type} payments updated`, uid, updated);
				return updated;
			},
			async decrement(
				listId: string,
				uid: string,
				type: 'toPay' | 'paid',
				value: number,
			) {
				const userPayment = await this.findUserPayment(listId, uid);
				const updated = { ...userPayment, [type]: userPayment[type] - value };
				await update(
					ref(db, `/groupAccounts/payments/${listId}/${uid}`),
					updated,
				);
				console.log(`decrement-${type} payments updated`, uid, updated);
				return updated;
			}, */

			async findByUid(listId: string, uid: string) {
				return get(ref(db, `/groupAccounts/payments/${listId}/${uid}`)).then(
					snapshot => {
						if (snapshot.exists()) {
							return snapshot.val() as UserPayment;
						}
					},
				);
			},
			deleteAll(listId: string) {
				remove(ref(db, `/groupAccounts/payments/${listId}`));
			},
		},
		receipts: {
			refRoot: '/groupAccounts/receipts',
			async addItem(listId: string, form: Omit<ReceiptItem, 'id'>) {
				const id = uuid();
				const element: ReceiptItem = { ...form, id };
				set(
					ref(db, `/groupAccounts/receipts/${listId}/${form.category}/${id}`),
					element,
				);
				console.log('add new receipt in db', element);
				return element;
			},
			async findByItem(listId: string, item: ReceiptItem) {
				const found = await get(
					ref(
						db,
						`/groupAccounts/receipts/${listId}/${item.category}/${item.id}`,
					),
				).then(snapshot => {
					if (snapshot.exists()) {
						return snapshot.val() as ReceiptItem;
					}
				});
				if (!found) {
					throw new Error(`Item Not Found: ${item}`);
				}
				return found;
			},
			deleteAll(listId: string) {
				remove(ref(db, `/groupAccounts/receipts/${listId}`));
			},
			async getAll(listId: string) {
				return get(ref(db, `${this.refRoot}/${listId}`)).then(snapshot => {
					if (snapshot.exists()) {
						return snapshot.val();
					}
				});
			},
			deleteItem(listId: string, item: ReceiptItem) {
				remove(
					ref(
						db,
						`/groupAccounts/receipts/${listId}/${item.category}/${item.id}`,
					),
				);
			},
			updateItem(listId: string, item: ReceiptItem) {
				update(
					ref(
						db,
						`/groupAccounts/receipts/${listId}/${item.category}/${item.id}`,
					),
					item,
				);
				console.log('receipt-item updated', item);
			},
			getListsByCategory: async (listId: string, category: Category) =>
				getLists<ReceiptItem>('receipts', `${listId}/${category}`),
		},
	},
};

export default database;
