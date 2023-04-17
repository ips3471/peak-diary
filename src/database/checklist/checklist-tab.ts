import { UserDB } from '../../types/models/model';
import {
	getDatabase,
	get,
	ref,
	set,
	update,
	remove,
	Database,
} from 'firebase/database';
import { firebaseApp } from '../../service/firebase/firebase';
import { CheckListTab } from '../../types/checklist/checklist';

class CheckListDatabase {
	private userRef: string;
	private db: Database;
	constructor(userId: string) {
		this.userRef = `checklists/${userId}`;
		this.db = getDatabase(firebaseApp);
	}

	get userDB(): UserDB {
		return { db: this.db, userRef: this.userRef };
	}

	addTab(tab: CheckListTab) {
		set(ref(this.db, `${this.userRef}/${tab.id}`), tab);
		console.log('add tab in db', tab);
	}

	updateTab(tab: CheckListTab) {
		update(ref(this.db, `${this.userRef}/${tab.id}`), tab);
		console.log('tab updated in db', tab);
	}
	async getTabs(): Promise<CheckListTab[]> {
		const snapshot = await get(ref(this.db, this.userRef));
		if (snapshot.exists()) {
			const data = Object.values(snapshot.val()) as {
				id: string;
				items: Object;
				name: string;
			}[];
			return data.map(i =>
				i.items ? { ...i, items: Object.values(i.items) } : { ...i, items: [] },
			);
		} else {
			return [];
		}
	}
	/* 	async getItems(): Promise<CheckListItem[]> {
		const snapshot = await get(ref(db, this.tabRef + '/items'));
		if (snapshot.exists()) {
			return Object.values(snapshot.val());
		}
		return [];
	} */

	deleteTab(tabId: string) {
		remove(ref(this.db, `${this.userRef}/${tabId}`));
		console.log('removed tab', tabId);
	}

	deleteItem() {}

	/*     async addList(list: Omit<CheckListItem, 'id'>) {
        const id = uuid();
        const element: CheckListItem = { ...list, id };
        set(ref(db, `/checklists/${list.category}/items/${id}`), element);
        console.log('add list in db', element);
        return element;
    }

    async addTab(name = ''): Promise<CheckListTab> {
        const id = uuid();
        const element = { name, id, items: [] };
        set(ref(db, `/checklists/${id}`), element);
        return element;
    } */

	/*     updateTab(tab: CheckListTabItem) {
        update(ref(db, `/checklists/${tab.id}`), tab);
        console.log('tab updated in db', tab);
    }

    updateItem(item: CheckListItem) {
        update(ref(db, `/checklists/${item.category}/items/${item.id}`), item);
        console.log('item updated', item);
    }

    deleteItem(item: CheckListItem) {
        remove(ref(db, `/checklists/${item.category}/items/${item.id}`));
        console.log('removed item', item.id, item.name);
    }

     */
}

export default CheckListDatabase;
