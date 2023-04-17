import { memo, useEffect, useReducer } from 'react';
import {
	CheckListItem,
	CheckListReducer,
	CheckListTab,
} from '../../../../types/checklist/checklist';
import checkListReducer from '../../../../reducer/checklist/checklist';
import { CheckListItemController } from '../../../../controller/checklist/checklist-item';
import FilteredItems from './filtered/filtered-by-state';

interface TabProps {
	controller: CheckListItemController | null;
	currentTab: CheckListTab;
}

function InitItemsByTab({ controller, currentTab }: TabProps) {
	console.log('***render checklist items');
	const [checkListItems, dispatch] = useReducer<
		CheckListReducer<CheckListItem>
	>(checkListReducer, []);

	useEffect(() => {
		dispatch({ type: 'init', payload: currentTab.items });
	}, [currentTab]);

	return (
		<div>
			{controller && (
				<FilteredItems allItems={checkListItems} controller={controller} />
			)}
		</div>
	);
}

export default memo(InitItemsByTab);
