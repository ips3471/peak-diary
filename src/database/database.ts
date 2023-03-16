import {
	CheckListItem,
	CheckListTab,
	CheckListTabItem,
} from './../types/interfaces/interfaces.d';
import { User } from 'firebase/auth';
import {
	getDatabase,
	onValue,
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
};

export default database;
