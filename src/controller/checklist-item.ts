import { UpdateState } from './../types/components/checklist.d';
import { CheckListItem, CheckListTab } from '../types/components/checklist';
import { v4 as uuid } from 'uuid';
import CheckListItemDatabase from '../database/checklist-item';
import { UserDB } from '../types/models/model';

export class CheckListItemController {
	private db: CheckListItemDatabase;
	currentTab: CheckListTab;
	constructor(userDB: UserDB, tab: CheckListTab) {
		this.db = new CheckListItemDatabase(userDB, tab.id);
		this.currentTab = tab;
	}

	addItem(
		input: string,
		isStaged: boolean,
		update: UpdateState<CheckListItem>,
	) {
		const element: CheckListItem = {
			name: input,
			checked: false,
			id: uuid(),
			staged: isStaged,
		};
		console.log('from controller', element);

		this.db.addItem(element);
		update(prev => [...prev, element]);
	}

	updateItem(
		item: CheckListItem,
		action:
			| { type: 'checked'; update: UpdateState<CheckListItem> }
			| {
					type: 'staged';
					update: {
						from: UpdateState<CheckListItem>;
						to: UpdateState<CheckListItem>;
					};
			  },
	) {
		const { type, update } = action;
		const updated: CheckListItem = { ...item, [type]: !item[type] };
		this.db.updateItem(updated);
		if (type === 'checked') {
			return update(prev => prev.map(i => (i.id === updated.id ? updated : i)));
		}
		if (type === 'staged') {
			const { from, to } = update;
			from(prev => prev.filter(i => i.id !== item.id));
			to(prev => [...prev, item.checked ? { ...item, checked: false } : item]);
		}
	}

	deleteItem(id: string, update: UpdateState<CheckListItem>) {
		this.db.deleteItem(id);
		update(prev => prev.filter(i => i.id !== id));
	}
}
