import { memo } from 'react';
import { CheckListItemController } from '../../../../controller/checklist/checklist-item';
import {
	CheckListItem,
	UpdateState,
} from '../../../../types/checklist/checklist';
import UnstagedItem from '../item/item-unstaged';

interface UnstagedContainerProps {
	items: CheckListItem[];
	onUpdate: UpdateState<CheckListItem>;
	toStagedState: UpdateState<CheckListItem>;
	controller: CheckListItemController;
}

function UnstagedContainer({
	items,
	controller,
	onUpdate,
	toStagedState,
}: UnstagedContainerProps) {
	console.log('***render unstaged-items');

	const handleDelete = (item: CheckListItem) => {
		controller.deleteItem(item.id, onUpdate);
	};

	const handleMove = (item: CheckListItem) => {
		const update = {
			from: onUpdate,
			to: toStagedState,
		};
		controller.updateItem(item, { type: 'staged', update });
	};

	return (
		<div>
			{items.map(i => (
				<UnstagedItem
					key={i.id}
					item={i}
					onMove={handleMove}
					onDelete={handleDelete}
				/>
			))}
		</div>
	);
}

export default memo(UnstagedContainer);
