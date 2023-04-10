import { memo } from 'react';
import { CheckListItemController } from '../../../../controller/checklist-item';
import {
	CheckListItem,
	UpdateState,
} from '../../../../types/components/checklist';
import StagedItem from '../item/item-staged';

interface StagedContainerProps {
	items: CheckListItem[];
	toUnstagedState: UpdateState<CheckListItem>;
	controller: CheckListItemController;
	onUpdate: UpdateState<CheckListItem>;
}

function StagedContainer({
	items,
	toUnstagedState,
	controller,
	onUpdate,
}: StagedContainerProps) {
	console.log('***render staged-items');

	const handleCheck = (item: CheckListItem) => {
		controller.updateItem(item, { type: 'checked', update: onUpdate });
	};

	const handleMove = (item: CheckListItem) => {
		const update = {
			from: onUpdate,
			to: toUnstagedState,
		};
		controller.updateItem(item, { type: 'staged', update });
	};

	const sortByChecked = (a: CheckListItem, b: CheckListItem) =>
		a.checked === b.checked ? 0 : a.checked ? 1 : -1;

	return (
		<div>
			{items.sort(sortByChecked).map(i => (
				<StagedItem
					key={i.id}
					onChangeChecked={handleCheck}
					item={i}
					onMove={handleMove}
				/>
			))}
		</div>
	);
}

export default memo(StagedContainer);
