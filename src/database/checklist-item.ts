import { Database, ref, remove, update } from 'firebase/database';
import { CheckListItem } from '../types/components/checklist';
import { UserDB } from '../types/models/model';

class CheckListItemDatabase {
	private tabRef: string;
	private db: Database;
	constructor(userDB: UserDB, tabId: string) {
		this.tabRef = `${userDB.userRef}/${tabId}/items`;
		this.db = userDB.db;
	}

	updateItem(item: CheckListItem) {
		update(ref(this.db, `${this.tabRef}/${item.id}`), item);
		console.log('item updated in db', item);
	}

	deleteItem(id: string) {
		remove(ref(this.db, `${this.tabRef}/${id}`));
		console.log('remove item in db', id);
	}

	addItem(item: CheckListItem) {
		update(ref(this.db, `${this.tabRef}/${item.id}`), item);
		console.log('add item in db', item);
	}
}

export default CheckListItemDatabase;
