import CheckListDatabase from '../../database/checklist/checklist-tab';
import { CheckListTab, UpdateReducer } from '../../types/checklist/checklist';
import { v4 as uuid } from 'uuid';

export class CheckListTabController {
	db: CheckListDatabase;
	constructor(userId: string) {
		this.db = new CheckListDatabase(userId);
	}

	initTabs(dispatch: UpdateReducer<CheckListTab>) {
		this.db.getTabs().then(data => dispatch({ type: 'init', payload: data }));
	}

	addTab(input: string, dispatch: UpdateReducer<CheckListTab>) {
		const element: CheckListTab = {
			id: uuid(),
			items: [],
			name: input,
		};
		this.db.addTab(element);
		dispatch({ type: 'add', payload: element });
		return element;
	}

	updateTab(
		input: string,
		tab: CheckListTab,
		dispatch: UpdateReducer<CheckListTab>,
	) {
		const updated: CheckListTab = { ...tab, name: input };
		this.db.updateTab(updated);
		dispatch({ type: 'update', payload: updated });
		return updated;
	}

	deleteTab(tab: CheckListTab, dispatch: UpdateReducer<CheckListTab>) {
		this.db.deleteTab(tab.id);
		dispatch({ type: 'delete', payload: tab.id });
	}

	deleteItem() {}
}
