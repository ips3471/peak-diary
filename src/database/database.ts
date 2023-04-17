import {
	Category,
	GroupAccountItem,
	ReceiptItem,
	UserPayment,
} from '../types/group-account/group-account';
import { UserProfile } from './../types/components/profile.d';
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
			async addList(form: GroupAccountItem) {
				const { id, host } = form;
				set(ref(db, `/groupAccounts/lists/${id}`), form);
				set(ref(db, `/groupAccounts/payments/${id}/${host}`), {
					paid: 0,
					toPay: 0,
				});
				console.log('add group-account in db', form);
				return form;
			},
			getLists: async () => getLists<GroupAccountItem>('lists'),
			async getList(listId: string): Promise<GroupAccountItem> {
				const snapshot = await get(ref(db, `groupAccounts/lists/${listId}`));
				if (snapshot.exists()) {
					return snapshot.val();
				} else {
					throw new Error('Not Found');
				}
			},
			updateList(id: string, item: GroupAccountItem) {
				update(ref(db, `/groupAccounts/lists/${id}`), item);
				console.log('groupAccount updated', item);
			},
			deleteList(id: string) {
				remove(ref(db, `/groupAccounts/lists/${id}`));
			},
		},
		userPayments: {
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
				console.log('get all receipts from DB');

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
